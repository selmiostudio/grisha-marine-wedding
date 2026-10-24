const intro = document.getElementById('intro');
const openButton = document.getElementById('openInvitation');
const audio = document.getElementById('music');
const musicButton = document.getElementById('musicButton');
let opened = false;

function updateMusicButton() {
  if (!audio || !musicButton) return;
  const playing = !audio.paused;
  musicButton.setAttribute('aria-pressed', String(playing));
  musicButton.setAttribute('aria-label', playing ? 'Անջատել երաժշտությունը' : 'Միացնել երաժշտությունը');
  musicButton.textContent = playing ? '♫' : '♪';
}

openButton.addEventListener('click', () => {
  if (opened) return;
  opened = true;
  // The user gesture allows audio to start on supported browsers.
  if (audio) audio.play().catch(() => {});
  document.body.classList.remove('locked');
  document.body.classList.add('revealed');
  intro.classList.add('finished');
  const main = document.getElementById('main');
  window.setTimeout(() => {
    intro.hidden = true;
    if (main) main.focus({preventScroll:true});
  }, 950);
});

if (audio && musicButton) {
  musicButton.addEventListener('click', async () => {
    if (audio.paused) {
      try { await audio.play(); }
      catch (error) { alert('Երաժշտության ֆայլը դեռ ավելացված չէ։'); }
    } else {
      audio.pause();
    }
    updateMusicButton();
  });
  audio.addEventListener('play', updateMusicButton);
  audio.addEventListener('pause', updateMusicButton);
}
const weddingDate=new Date('2026-11-20T15:00:00+04:00').getTime();
function updateCountdown(){let seconds=Math.max(0,Math.floor((weddingDate-Date.now())/1000));const days=Math.floor(seconds/86400);seconds%=86400;const hours=Math.floor(seconds/3600);seconds%=3600;const minutes=Math.floor(seconds/60);seconds%=60;for(const [id,value] of Object.entries({days,hours,minutes,seconds})){document.getElementById(id).textContent=String(value).padStart(2,'0')}}updateCountdown();setInterval(updateCountdown,1000);
const attendance=document.querySelectorAll('input[name="attendance"]');const countGroup=document.getElementById('guestCountGroup');attendance.forEach(input=>input.addEventListener('change',()=>{countGroup.hidden=document.querySelector('input[name="attendance"]:checked').value==='no'}));

/* RSVP — Google Sheets integration */

const RSVP_URL = 'https://script.google.com/macros/s/AKfycbwC4bfjAth8nyAzCHtL-4fPC4H9Nd94GZrHPduyeE6EOXVQlmDFDhobmcQ_VZFfTyvk/exec';

const rsvpForm = document.getElementById('rsvpForm');
const formStatus = document.getElementById('formStatus');

if (rsvpForm && formStatus) {
  rsvpForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!rsvpForm.reportValidity()) return;

    const submitButton = rsvpForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    const formData = new FormData(rsvpForm);

    if (formData.get('attendance') === 'no') {
      formData.set('guests', '0');
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Ուղարկվում է...';
    formStatus.textContent = '';

    try {
      await fetch(RSVP_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });

      // no-cors does not allow reading the server response.
      // We cannot confirm successful storage from this request.
      formStatus.textContent =
        'Հարցումն ուղարկվել է։ Շնորհակալություն։';

      rsvpForm.reset();
      document.getElementById('guestCountGroup').hidden = false;

    } catch (error) {
      formStatus.textContent =
        'Չհաջողվեց ուղարկել։ Խնդրում ենք փորձել կրկին։';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}
