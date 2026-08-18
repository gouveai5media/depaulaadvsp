const brl = new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'});
const apuracao=document.querySelector('#apuracao'), residual=document.querySelector('#residual'), desconto=document.querySelector('#desconto');
function calcular(){
  const a=Math.max(0,Number(apuracao.value)||0), r=Number(residual.value)/100, d=Number(desconto.value)/100;
  const darf=a*r, credito=a-darf, economia=credito*d, reembolso=credito-economia, total=darf+reembolso;
  residualLabel.textContent=`${residual.value}%`; descontoLabel.textContent=`${desconto.value}%`;
  economiaMensal.textContent=brl.format(economia); economiaAnual.textContent=brl.format(economia*12); darfResidual.textContent=brl.format(darf); credito.textContent=brl.format(credito); reembolso.textContent=brl.format(reembolso); custoTotal.textContent=brl.format(total);
  document.querySelectorAll('.preset button').forEach(b=>b.classList.toggle('active',b.dataset.preset===desconto.value));
}
[apuracao,residual,desconto].forEach(el=>el.addEventListener('input',calcular));
document.querySelectorAll('.preset button').forEach(b=>b.addEventListener('click',()=>{desconto.value=b.dataset.preset;calcular()}));
menu.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

// Formulário de contato
const contatoStyle=document.createElement('style');
contatoStyle.textContent=`
.contact-section{padding:110px 7vw}.contact-wrap{display:grid;grid-template-columns:.85fr 1.15fr;gap:55px;align-items:center;padding:48px;background:linear-gradient(145deg,rgba(19,43,36,.96),rgba(9,20,17,.98));border:1px solid rgba(216,181,106,.28);box-shadow:0 30px 80px rgba(0,0,0,.25)}.contact-copy h2{font-family:'Playfair Display',serif;font-weight:600;font-size:clamp(36px,4vw,56px);line-height:1.08;margin:16px 0}.contact-copy p{color:#9daaa5;line-height:1.8}.contact-form{display:grid;grid-template-columns:1fr 1fr;gap:16px}.contact-form label{margin:0;color:#9daaa5;font-size:12px}.contact-form input{width:100%;margin-top:8px;padding:16px;background:#07100e;border:1px solid rgba(255,255,255,.1);color:#fff;font:inherit;outline:none}.contact-form input:focus{border-color:#d8b56a}.contact-form .full{grid-column:1/-1}.contact-form button{grid-column:1/-1;padding:16px 24px;background:linear-gradient(135deg,#d8b56a,#f2d898);color:#172019;border:0;font-weight:800;cursor:pointer;font-size:14px}.contact-form button:hover{transform:translateY(-1px)}.contact-note{grid-column:1/-1;color:#71807a;font-size:10px;line-height:1.5;margin:0}@media(max-width:850px){.contact-wrap{grid-template-columns:1fr;padding:32px}.contact-section{padding:70px 5vw}}@media(max-width:560px){.contact-form{grid-template-columns:1fr}.contact-form .full,.contact-form button,.contact-note{grid-column:auto}}
`;
document.head.appendChild(contatoStyle);

const ctaSection=document.querySelector('.cta-section');
if(ctaSection){
  const contatoSection=document.createElement('section');
  contatoSection.className='contact-section reveal';
  contatoSection.id='contato';
  contatoSection.innerHTML=`
    <div class="contact-wrap">
      <div class="contact-copy">
        <span class="eyebrow">FALE COM A DE PAULA ADVOGADOS</span>
        <h2>Solicite uma avaliação tributária da sua empresa.</h2>
        <p>Preencha os dados abaixo. Ao encaminhar, você será direcionado ao WhatsApp da equipe com as informações prontas para atendimento.</p>
      </div>
      <form class="contact-form" id="contactForm">
        <label>Nome da empresa<input type="text" id="contactEmpresa" name="empresa" required autocomplete="organization" placeholder="Nome da empresa"></label>
        <label>Responsável<input type="text" id="contactResponsavel" name="responsavel" required autocomplete="name" placeholder="Nome do responsável"></label>
        <label>E-mail<input type="email" id="contactEmail" name="email" required autocomplete="email" placeholder="email@empresa.com.br"></label>
        <label>Telefone<input type="tel" id="contactTelefone" name="telefone" required autocomplete="tel" placeholder="(11) 99999-9999"></label>
        <button type="submit">Encaminhar pelo WhatsApp →</button>
        <p class="contact-note">Ao encaminhar, os dados preenchidos serão inseridos em uma mensagem para atendimento via WhatsApp.</p>
      </form>
    </div>`;
  ctaSection.parentNode.insertBefore(contatoSection,ctaSection);

  const contatoLink=document.createElement('a');
  contatoLink.href='#contato';
  contatoLink.textContent='Contato';
  contatoLink.addEventListener('click',()=>nav.classList.remove('open'));
  nav.appendChild(contatoLink);

  document.getElementById('contactForm').addEventListener('submit',e=>{
    e.preventDefault();
    const empresa=document.getElementById('contactEmpresa').value.trim();
    const responsavel=document.getElementById('contactResponsavel').value.trim();
    const email=document.getElementById('contactEmail').value.trim();
    const telefone=document.getElementById('contactTelefone').value.trim();
    const mensagem=`Olá, gostaria de falar com a De Paula Advogados sobre uma avaliação tributária.\n\nEmpresa: ${empresa}\nResponsável: ${responsavel}\nE-mail: ${email}\nTelefone: ${telefone}`;
    const whatsapp=`https://wa.me/5511932937691?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsapp,'_blank','noopener,noreferrer');
  });
}

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
calcular();
