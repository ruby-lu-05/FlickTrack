var rootStyles = getComputedStyle(document.documentElement);

var green3 = rootStyles.getPropertyValue("--green3");
var green2 = rootStyles.getPropertyValue("--green2");
var green1 = rootStyles.getPropertyValue("--green1");

const calendar = document.getElementById('calendar');
const monthElement = document.getElementById('month');

const months = [
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
];

const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
];

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const drawDaysOfWeek = () => {
    for (let i=0; i<7; i++) {
        const dayOfWeek = document.createElement('div');
        const dayOfWeekText = document.createElement('h2');
        dayOfWeekText.innerText = days[i];
        dayOfWeekText.classList.add('day-of-week')

        dayOfWeek.appendChild(dayOfWeekText);
        calendar.appendChild(dayOfWeek);
    }
}

const drawBlankCalendar = () => {
    for (let i=0; i<35; i++) {
        const day = document.createElement('div');
        day.classList.add('day');

        const dayNumber = document.createElement('p');
        dayNumber.classList.add('day-number');

        day.appendChild(dayNumber);
        calendar.appendChild(day);
    }
};

const updateCalendar = (month, year, media) => {
    const dayElements = document.querySelectorAll('.day');
    const date = new Date();
    const theFirst = new Date(date.getFullYear(), date.getMonth(), 1);
    theFirst.setMonth(month);
    theFirst.setYear(year);

    const firstDayOfWeek = theFirst.getDay();
    const monthName = months[month];
    monthElement.innerText = monthName + " " + year;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let dayCounter = 1;
    for (let i=0; i<dayElements.length; i++) {
        const day = dayElements[i];

        const dayNumber = day.querySelector('.day-number');

        if (i>=firstDayOfWeek && dayCounter<=daysInMonth) {
            day.classList.add("has-day");
            dayNumber.innerText = dayCounter;
            dayCounter++;
        } else {
            day.classList.remove("has-day");
            dayNumber.innerText = '';
        }

        if (today.getMonth() == currentMonth && today.getFullYear() == currentYear && dayNumber.textContent == today.getUTCDate()) {
            dayNumber.style.color = green2;
        } else {
            dayNumber.style.color = 'white';
        }
    }
}

const previousMonth = () => {
    if (currentMonth === 0) {
        currentMonth = 12;
        currentYear--;
    }
    updateCalendar(--currentMonth,currentYear);
}

const nextMonth = () => {
    if (currentMonth === 11) {
        currentMonth = -1;
        currentYear++;
    }
    updateCalendar(++currentMonth,currentYear);
}

drawDaysOfWeek();
drawBlankCalendar();
updateCalendar(currentMonth,currentYear);