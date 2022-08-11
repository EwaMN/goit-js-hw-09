import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timer = document.querySelector('.timer');
const value = Array.from(document.querySelectorAll('span.value'));
const labels = Array.from(document.querySelectorAll('.label'));
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
const fields = Array.from(document.querySelectorAll('div.field'));
const input = document.querySelector('input#datetime-picker');
const startButton = document.querySelector(`button[data-start]`);


startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future', {
        width: '50vw',
      });
    }
    if (selectedDates[0].getTime() > options.defaultDate.getTime()) {
      startButton.disabled = false;
      localStorage.setItem('selectedDate', `${selectedDates[0].getTime()}`);
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(num) {
  if (`${num}`.length === 1) {
    return (num = `${num}`.padStart(2, '0'));
  } else {
    return `${num}`;
  }
}

startButton.addEventListener('click', () => {
  const initFun = () => {
    const selectDate = localStorage.getItem('selectedDate');
    const currentDate = new Date();
    const getDate = currentDate.getTime();
    const countDate = selectDate - getDate;
    const date = convertMs(countDate);
    if (countDate < 1000) {
      clearInterval(timerId);
    }
    const getSpan = () => {
      dataDays.textContent = `${addLeadingZero(date.days)}`;
      dataHours.textContent = `${addLeadingZero(date.hours)}`;
      dataMinutes.textContent = `${addLeadingZero(date.minutes)}`;
      dataSeconds.textContent = `${addLeadingZero(date.seconds)}`;
    };
    getSpan();
  };
  const timerId = setInterval(initFun, 1000);
});

/-- styles --/
input.style.width = '300px';
input.style.fontSize = '30px';
input.style.textAlign = 'center';

startButton.style.fontSize = '15px';
startButton.style.padding = '2px';
input.style.padding = '2px';

timer.style.display = 'flex';


for (const field of fields) {
  field.style.marginRight = '20px';
}
for (const values of value) {
  values.style.display = 'block';
  values.style.textAlign = 'center';
  values.style.fontSize = '30px';
  values.style.lineHeight = '1.5';
}
for (const label of labels) {
  label.style.display = 'block';
  label.style.textAlign = 'center';
  label.style.fontSize = '10px';
  label.style.textTransform = 'uppercase';
  label.style.lineHeight = '0.2';
}