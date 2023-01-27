const year = document.querySelector('.calendar_year');
const month = document.querySelector('.calendar_month');
const days = document.querySelector('.calendar_date');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');

const date = new Date();
const nowYear = date.getFullYear();
const nowMonth = date.getMonth();

const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  'previousOrNext',
];
year.innerHTML = `${nowYear}`;
month.innerHTML = `${MONTH[nowMonth]}`;

const lastDate = (year, month, day = 0) => new Date(year, month, day);

previousDays(year.innerHTML, MONTH.indexOf(month.innerHTML));
getDays(year.innerHTML, MONTH.indexOf(month.innerHTML));
nextDays(year.innerHTML, MONTH.indexOf(month.innerHTML));

function handleNextBtn() {
  month.innerHTML = MONTH[MONTH.indexOf(month.innerHTML) + 1];
  if (month.innerHTML === 'previousOrNext') {
    year.innerHTML = +year.innerHTML + 1;
    month.innerHTML = MONTH[0];
  }
  days.innerHTML = '';
  previousDays(year.innerHTML, MONTH.indexOf(month.innerHTML));
  getDays(year.innerHTML, MONTH.indexOf(month.innerHTML));
  nextDays(year.innerHTML, MONTH.indexOf(month.innerHTML));
}

function handlePreviousBtn() {
  month.innerHTML = MONTH.at([MONTH.indexOf(month.innerHTML) - 1]);
  if (month.innerHTML === 'previousOrNext') {
    year.innerHTML = +year.innerHTML - 1;
    month.innerHTML = MONTH[11];
  }
  days.innerHTML = '';
  previousDays(year.innerHTML, MONTH.indexOf(month.innerHTML));
  getDays(year.innerHTML, MONTH.indexOf(month.innerHTML));
  nextDays(year.innerHTML, MONTH.indexOf(month.innerHTML));
}

function previousDays(year, month) {
  const dayStart = lastDate(year, month).getDay();
  if (dayStart < 6) {
    for (i = lastDate(year, month).getDate() - dayStart; i <= lastDate(year, month).getDate(); i++) {
      const div = document.createElement('div');
      div.append(i);
      days.appendChild(div);
    }
  }
}

function getDays(year, month) {
  for (i = 1; i <= lastDate(year, month + 1).getDate(); i++) {
    const div = document.createElement('div');
    div.append(i);
    days.appendChild(div);
  }
}

function nextDays(year, month) {
  const dayStart = lastDate(year, month + 1).getDay();
  for (i = 1; i <= 6 - dayStart; i++) {
    const div = document.createElement('div');
    div.append(i);
    days.appendChild(div);
  }
}

nextButton.addEventListener('click', handleNextBtn);
previousButton.addEventListener('click', handlePreviousBtn);
