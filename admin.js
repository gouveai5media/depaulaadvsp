const LOGIN_EMAIL='executivo@depaula.com.br';
const LOGIN_PASSWORD='depaula2026';
const loginScreen=document.getElementById('loginScreen');
const adminApp=document.getElementById('adminApp');
const loginForm=document.getElementById('loginForm');
const loginError=document.getElementById('loginError');

function showAdmin(){
  loginScreen.hidden=true;
  adminApp.hidden=false;
}
function showLogin(){
  sessionStorage.removeItem('depaula_admin');
  loginScreen.hidden=false;
  adminApp.hidden=true;
}
if(sessionStorage.getItem('depaula_admin')==='ok') showAdmin();

loginForm.addEventListener('submit',e=>{
  e.preventDefault();
  const email=document.getElementById('email').value.trim().toLowerCase();
  const senha=document.getElementById('senha').value;
  if(email===LOGIN_EMAIL && senha===LOGIN_PASSWORD){
    sessionStorage.setItem('depaula_admin','ok');
    loginError.textContent='';
    showAdmin();
  }else{
    loginError.textContent='E-mail ou senha inválidos.';
  }
});

document.getElementById('logoutBtn').addEventListener('click',showLogin);

document.querySelectorAll('.sidebar nav a').forEach(link=>{
  link.addEventListener('click',()=>{
    document.querySelectorAll('.sidebar nav a').forEach(a=>a.classList.remove('active'));
    link.classList.add('active');
  });
});