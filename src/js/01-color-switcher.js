function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
stop.disabled = true;
let intervalId;

start.addEventListener('click', () => {
  stop.disabled = false;
  start.disabled = true;
  if (!intervalId) {
    intervalId = setInterval(() => {
      document.querySelector([
        'body',
      ]).style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);
  }
});

stop.addEventListener('click', () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  stop.disabled = true;
  start.disabled = false;
});
