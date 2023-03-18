import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const buttonEl = document.querySelector('button[data-start]');
const dataDaysEl = document.querySelector('span[data-days]');
const dataHoursEl = document.querySelector('span[data-hours]');
const dataMinutesEl = document.querySelector('span[data-minutes]');
const dataSecondsEl = document.querySelector('span[data-seconds]');
const inputEl = document.querySelector('#datetime-picker');

buttonEl.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < options.defaultDate) {
           Notiflix.Notify.warning("Please choose a date in the future")
            // alert("Please choose a date in the future");
            return;
      }
      buttonEl.removeAttribute("disabled");
      buttonEl.addEventListener('click', hendleСountTimerClick);

      function hendleСountTimerClick() {
          buttonEl.setAttribute('disabled', true);
          const intervalId = setInterval(() => {
              const differenceTime = selectedDates[0] - new Date();
              const { days, hours, minutes, seconds } = convertMs(differenceTime);

              dataDaysEl.textContent = addLeadingZero(`${days}`);
              dataHoursEl.textContent = addLeadingZero(`${hours}`);
              dataMinutesEl.textContent = addLeadingZero(`${minutes}`);
              dataSecondsEl.textContent = addLeadingZero(`${seconds}`);

              if (differenceTime < 1000) {
                  clearInterval(intervalId)
              }
      },1000)
  }
      }
};
    
flatpickr(inputEl, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}