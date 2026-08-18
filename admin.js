document.addEventListener('DOMContentLoaded',()=>{
  const LOGIN_EMAIL='executivo@depaula.com.br';
  const LOGIN_PASSWORD='depaula2026';

  const loginScreen=document.getElementById('loginScreen');
  const adminApp=document.getElementById('adminApp');
  const loginForm=document.getElementById('loginForm');
  const loginError=document.getElementById('loginError');
  const logoutBtn=document.getElementById('logoutBtn');

  if(!loginScreen || !adminApp || !loginForm){
    console.error('Estrutura da area executiva nao foi carregada corretamente.');
    return;
  }

  function showAdmin(){
    loginScreen.hidden=true;
    loginScreen.classList.add('is-hidden');
    adminApp.hidden=false;
    adminApp.classList.remove('is-hidden');
    window.scrollTo({top:0,behavior:'auto'});
  }

  function showLogin(){
    sessionStorage.removeItem('depaula_admin');
    adminApp.hidden=true;
    adminApp.classList.add('is-hidden');
    loginScreen.hidden=false;
    loginScreen.classList.remove('is-hidden');
    if(loginError) loginError.textContent='';
    window.scrollTo({top:0,behavior:'auto'});
  }

  adminApp.classList.add('is-hidden');

  if(sessionStorage.getItem('depaula_admin')==='ok'){
    showAdmin();
  }else{
    showLogin();
  }

  loginForm.addEventListener('submit',e=>{
    e.preventDefault();
    const email=(document.getElementById('email')?.value||'').trim().toLowerCase();
    const senha=document.getElementById('senha')?.value||'';

    if(email===LOGIN_EMAIL && senha===LOGIN_PASSWORD){
      sessionStorage.setItem('depaula_admin','ok');
      if(loginError) loginError.textContent='';
      showAdmin();
    }else if(loginError){
      loginError.textContent='E-mail ou senha invalidos.';
    }
  });

  if(logoutBtn) logoutBtn.addEventListener('click',showLogin);

  document.querySelectorAll('.sidebar nav a').forEach(link=>{
    link.addEventListener('click',()=>{
      document.querySelectorAll('.sidebar nav a').forEach(a=>a.classList.remove('active'));
      link.classList.add('active');
    });
  });
});