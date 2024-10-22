const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

let calendar = document.querySelector('.calendar');
const month_names = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
let month_picker = document.querySelector('#month-picker');
let month_list = calendar.querySelector('.month-list');
const dayTextFormat = document.querySelector('.day-text-format');
const timeFormat = document.querySelector('.time-format');
const dateFormat = document.querySelector('.date-format');

month_picker.onclick = () => {
  month_list.classList.toggle('show');
  dayTextFormat.classList.toggle('hide-time');
  timeFormat.classList.toggle('hide-time');
  dateFormat.classList.toggle('hide-time');
};

const generateCalendar = (month, year) => {
  let calendar_days = document.querySelector('.calendar-days');
  calendar_days.innerHTML = '';
  let calendar_header_year = document.querySelector('#year');
  let days_of_month = [
      31, getFebDays(year), 31, 30, 31, 30,
      31, 31, 30, 31, 30, 31,
  ];

  let currentDate = new Date();
  month_picker.innerHTML = month_names[month];
  calendar_header_year.innerHTML = year;
  let first_day = new Date(year, month, 1);

  for (let i = 0; i < days_of_month[month] + first_day.getDay(); i++) {
      let day = document.createElement('div');

      if (i >= first_day.getDay()) {
          day.innerHTML = i - first_day.getDay() + 1;
          day.classList.add('calendar-day');

          if (i - first_day.getDay() + 1 === currentDate.getDate() &&
              year === currentDate.getFullYear() &&
              month === currentDate.getMonth()) {
              day.classList.add('current-date');
          }

          day.onclick = () => {
              alert(`Selected date: ${day.innerHTML} ${month_names[month]} ${year}`);
          };
      }
      calendar_days.appendChild(day);
  }
};

month_names.forEach((e, index) => {
  let month = document.createElement('div');
  month.innerHTML = `<div>${e}</div>`;
  month_list.append(month);
  month.onclick = () => {
      currentMonth.value = index;
      generateCalendar(currentMonth.value, currentYear.value);
      month_list.classList.remove('show');
      dayTextFormat.classList.remove('hide-time');
      timeFormat.classList.remove('hide-time');
      dateFormat.classList.remove('hide-time');
  };
});

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

document.querySelector('#pre-year').onclick = () => {
  currentYear.value--;
  generateCalendar(currentMonth.value, currentYear.value);
};

document.querySelector('#next-year').onclick = () => {
  currentYear.value++;
  generateCalendar(currentMonth.value, currentYear.value);
};

// Update time and date display
const updateDisplay = () => {
  const currShowDate = new Date();
  const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
  };
  dateFormat.textContent = new Intl.DateTimeFormat('en-US', options).format(currShowDate);
  
  setInterval(() => {
      const timer = new Date();
      const timeOptions = {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
      };
      timeFormat.textContent = new Intl.DateTimeFormat('en-US', timeOptions).format(timer);
  }, 1000);
};

updateDisplay();
