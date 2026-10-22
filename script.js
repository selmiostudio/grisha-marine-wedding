const intro=document.getElementById('intro');
const openButton=document.getElementById('openInvitation');
const audio=document.getElementById('music');
const musicButton=document.getElementById('musicButton');
let opened=false;
const continueButton=document.getElementById('continueInvitation');
const tapHint=document.getElementById('tapHint');
function updateMusicButton(){if(!audio||!musicButton)return;const playing=!audio.paused;musicButton.setAttribute('aria-pressed',String(playing));musicButton.setAttribute('aria-label',playing?'Անջատել երաժշտությունը':'Միացնել երաժշտությունը');musicButton.textContent=playing?'♫':'♪';}
openButton.addEventListener('click',()=>{
  if(opened)return;
  opened=true;
  openButton.disabled=true;
  intro.classList.add('opening');
  tapHint.classList.add('hint-hidden');
  if(audio) audio.play().catch(()=>{});
  updateMusicButton();
  window.setTimeout(()=>intro.classList.add('show-open'),1100);
  window.setTimeout(()=>{
    continueButton.hidden=false;
    continueButton.classList.add('visible');
    continueButton.focus({preventScroll:true});
  },2600);
});
continueButton.addEventListener('click',()=>{
  if(!opened)return;
  document.body.classList.remove('locked');
  document.body.classList.add('revealed');
  intro.classList.add('finished');
  window.setTimeout(()=>{intro.hidden=true;},1050);
  document.getElementById('main').focus({preventScroll:true});
});
musicButton.addEventListener('click',async()=>{if(audio.paused){try{await audio.play()}catch(e){alert('Երաժշտության ֆայլը դեռ ավելացված չէ։')}}else audio.pause();updateMusicButton();});
audio.addEventListener('play',updateMusicButton);audio.addEventListener('pause',updateMusicButton);
const weddingDate=new Date('2026-11-20T15:00:00+04:00').getTime();
function updateCountdown(){let seconds=Math.max(0,Math.floor((weddingDate-Date.now())/1000));const days=Math.floor(seconds/86400);seconds%=86400;const hours=Math.floor(seconds/3600);seconds%=3600;const minutes=Math.floor(seconds/60);seconds%=60;for(const [id,value] of Object.entries({days,hours,minutes,seconds})){document.getElementById(id).textContent=String(value).padStart(2,'0')}}updateCountdown();setInterval(updateCountdown,1000);
const attendance=document.querySelectorAll('input[name="attendance"]');const countGroup=document.getElementById('guestCountGroup');attendance.forEach(input=>input.addEventListener('change',()=>{countGroup.hidden=document.querySelector('input[name="attendance"]:checked').value==='no'}));
// RSVP is intentionally not submitted until a secure endpoint is configured.
document.getElementById('rsvpForm').addEventListener('submit',event=>{event.preventDefault();document.getElementById('formStatus').textContent='Հաստատման ձևը շուտով կգործարկվի։ Ձեր պատասխանը դեռ չի ուղարկվել։';});
