function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

let backgroundChange = null;

const colorChange = () => {
  return (body.style.backgroundColor = `${getRandomHexColor()}`);
};

const colorStop = () => {
  clearInterval(backgroundChange);
  buttonStart.disabled = false;
};

buttonStart.addEventListener('click', () => {
  backgroundChange = setInterval(colorChange, 1000);
  buttonStart.disabled = true;
});

buttonStop.addEventListener('click', colorStop);