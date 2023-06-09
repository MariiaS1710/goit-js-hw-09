import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('button[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const timerText = document.querySelector('.timer');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            window.alert("Please choose a date in the future");
            btnStart.disabled = true;
        } else {
           btnStart.disabled = false; 
      }
    },
};
flatpickr(dateTimePicker, options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes =addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
function updateTimer(time) {
    days.textContent = time.days;
    hours.textContent = time.hours;
    minutes.textContent = time.minutes
    seconds.textContent = time.seconds
}

const timer = {
    // isActive: false,
    start() {
        
        // if (this.isActive) {
        //         return; 
        // }
        // this.isActive = true;
        this.intervalId =setInterval(() => {
            
            const starttDate = new Date(dateTimePicker.value);  
            const curentDate = Date.now();
            const deltaTime = starttDate - curentDate;
            const time = convertMs(deltaTime);
            // this.isActive = false;
            if (deltaTime >= 0) {
                updateTimer(time);
            } else {
                alert('finished');
                clearInterval(this.intervalId); 
            } 
                       
        },1000)
    }
    
}
btnStart.addEventListener('click', () => {

    timer.start()
} );


    


// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
