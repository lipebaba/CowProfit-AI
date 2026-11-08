'use strict';
const boxes=[...document.querySelectorAll('#items input')];
const key='cowprofit-prevention-v1';
let storageAvailable=true;
try{const state=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(state))boxes.forEach((box,i)=>{box.checked=state[i]===true;});}catch{storageAvailable=false;}
function update(save=false){const n=boxes.filter(b=>b.checked).length;document.getElementById('percent').textContent=Math.round(n/boxes.length*100)+'%';document.getElementById('count').textContent=`${n} de ${boxes.length} cuidados realizados`;document.getElementById('progress').value=n;document.getElementById('progress').textContent=`${n} de ${boxes.length}`;document.getElementById('feedback').textContent=n===boxes.length?'Rotina concluída! Mantenha os cuidados e o acompanhamento veterinário.':n===0?'Vamos começar? Cada cuidado conta.':`Você já realizou ${n} cuidados. Continue com atenção aos itens restantes.`;if(save){try{localStorage.setItem(key,JSON.stringify(boxes.map(b=>b.checked)));}catch{storageAvailable=false;}}if(!storageAvailable)document.getElementById('save-note').textContent='O armazenamento está indisponível. Seu progresso será mantido apenas enquanto esta página estiver aberta. Este checklist não mede o risco de mastite.';}
boxes.forEach(b=>b.addEventListener('change',()=>update(true)));
document.getElementById('reset').addEventListener('click',()=>{if(boxes.some(b=>b.checked)&&!confirm('Iniciar uma nova rotina? As marcações atuais serão apagadas.'))return;boxes.forEach(b=>b.checked=false);update(true);});
document.getElementById('print').addEventListener('click',()=>window.print());
update();
