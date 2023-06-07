import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const input = document.getElementById('datetime-picker');
const start = document.querySelector('[data-start]');
start.disabled = true;
let datePicked;

flatpickr(input, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      start.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 2000,
      });
    } else {
      datePicked = selectedDates[0];
      start.disabled = false;
    }
  },
});

const timerRefs = {
  d: document.querySelector('[data-days]'),
  h: document.querySelector('[data-hours]'),
  m: document.querySelector('[data-minutes]'),
  s: document.querySelector('[data-seconds]'),
};

function startTimer(targetDate) {
  function updateTimer() {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    timerRefs.d.textContent = padZero(days);
    timerRefs.h.textContent = padZero(hours);
    timerRefs.m.textContent = padZero(minutes);
    timerRefs.s.textContent = padZero(seconds);
  }

  function padZero(value) {
    return value.toString().padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

start.addEventListener('click', () => {
  start.disabled = true;
  const targetDate = new Date(datePicked).getTime();
  startTimer(targetDate);
});
