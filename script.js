const brl = new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'});
const numeroBR = new Intl.NumberFormat('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});

const apuracao=document.getElementById('apuracao');
const economiaMensalEl=document.getElementById('economiaMensal');
const economiaAnualEl=document.getElementById('economiaAnual');
const darfResidualEl=document.getElementById('darfResidual');
const creditoEl=document.getElementById('credito');
const reembolsoEl=document.getElementById('reembolso');
const custoTotalEl=document.getElementById('custoTotal');
const validacaoEl=document.getElementById('validacaoCalculo');
const menuEl=document.getElementById('menu');
const navEl=document.getElementById('nav');

const DARF_RESIDUAL_PCT=0.10;
const CREDITO_PCT=0.90;
const ECONOMIA_SOBRE_CREDITO_PCT=0.30;

function valorApuracao(){
  if(!apuracao) return 0;
  const digits=(apuracao.value||'').replace(/\D/g,'');
  return digits ? Number(digits)/100 : 0;
}

function formatarApuracao(valor){
  if(apuracao) apuracao.value=numeroBR.format(Math.max(0,valor));
}

function calcular(){
  const a=valorApuracao();
  const darf=a*DARF_RESIDUAL_PCT;
  const credito=a*CREDITO_PCT;
  const economia=credito*ECONOMIA_SOBRE_CREDITO_PCT;
  const pagamentoCredito=credito-economia;
  const total=darf+pagamentoCredito;
  const anual=economia*12;

  if(economiaMensalEl) economiaMensalEl.textContent=brl.format(economia);
  if(economiaAnualEl) economiaAnualEl.textContent=brl.format(anual);
  if(darfResidualEl) darfResidualEl.textContent=brl.format(darf);
  if(creditoEl) creditoEl.textContent=brl.format(credito);
  if(reembolsoEl) reembolsoEl.textContent=brl.format(pagamentoCredito);
  if(custoTotalEl) custoTotalEl.textContent=brl.format(total);
  if(validacaoEl) validacaoEl.textContent=`${brl.format(total)} + ${brl.format(economia)} = ${brl.format(a)}`;
}

if(apuracao){
  apuracao.addEventListener('input',()=>{
    const a=valorApuracao();
    formatarApuracao(a);
    calcular();
    try{apuracao.setSelectionRange(apuracao.value.length,apuracao.value.length)}catch(e){}
  });
  apuracao.addEventListener('focus',()=>apuracao.select());
}

if(menuEl && navEl){
  menuEl.addEventListener('click',()=>navEl.classList.toggle('open'));
  document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>navEl.classList.remove('open')));
}

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
formatarApuracao(100000);
calcular();
