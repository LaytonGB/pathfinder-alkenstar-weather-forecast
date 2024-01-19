const calendarDiv = document.querySelector('#calendar');

const settingsBtn = document.querySelector('#toggle-settings');
const settingsMenu = document.querySelector('#settings-menu');
const settingsSeedField = document.querySelector('#set-random-seed');
const settingsSeedSubmit = document.querySelector('#submit-random-seed');

const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const dayField = document.querySelector('#day-field');


const calendar = new Proxy(getCalendar(), {
    set(target, property, value) {
        target[property] = cookie.set(property, value, (x) => !isNaN(Number(x)) && Number(x) >= 1 && Number(x) < 10000);
        updateCalendar();
        return true;
    }
});

const properties = new Proxy({
    seed: cookie.get('seed') || 69420,
}, {
    set(target, property, value) {
        target[property] = cookie.set(property, value);
        updateCalendar();
        updatePropertiesForms();
        return true;
    }
});


settingsBtn.addEventListener('click', () => {
    settingsMenu.classList.toggle('hidden');
});

settingsSeedField.value = properties.seed;
settingsSeedField.addEventListener('change', () => {
    properties.seed = Number(settingsSeedField.value);
});

settingsSeedSubmit.addEventListener('click', () => {
    properties.seed = Number(settingsSeedField.value);
});


prevBtn.addEventListener('click', () => {
    calendar.prev();
});

nextBtn.addEventListener('click', () => {
    calendar.next();
});

dayField.addEventListener('change', () => {
    calendar.day = Number(dayField.value);
});


function updatePropertiesForms() {
    settingsSeedField.value = properties.seed;
}


function timeRangeAsString(startDate, endDate) {
    return Intl.NumberFormat('en-UK', {minimumIntegerDigits: 2}).format(startDate.getHours())
        + ':' + Intl.NumberFormat('en-UK', {minimumIntegerDigits: 2}).format(startDate.getMinutes())
        + ' - ' + Intl.NumberFormat('en-UK', {minimumIntegerDigits: 2}).format(endDate.getHours())
        + ':' + Intl.NumberFormat('en-UK', {minimumIntegerDigits: 2}).format(endDate.getMinutes());
}


function updateCalendar() {
    const random = newRng(properties.seed);
    calendarDiv.innerHTML = '';
    let currentDay;
    for (let i = 1; i <= calendar.day + 2; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = `Day ${i}`;
        if (i < calendar.day) {
            dayDiv.classList.add('past');
        } else if (i === calendar.day) {
            currentDay = dayDiv;
            dayDiv.classList.add('current');
        }

        const dayDetails = document.createElement('ul');
        let generatingSurgeTimes = true;
        const surges = []; // create surges list
        while (generatingSurgeTimes) {
            const [surgeStart, surgeEnd] = generateSurgeTime(random);
            if (surgeStart.getTime() < surgeEnd.getTime()) {
                surges.push([surgeStart, surgeEnd]);
            }
            generatingSurgeTimes = random() <= 0.05;
        }
        surges.sort((a, b) => a[0].getTime() - b[0].getTime()); // sort by start
        for (let i = 1; i < surges.length; i++) { // if overlapping, merge
            const [prevSurgeStart, prevSurgeEnd] = surges[i - 1];
            const [surgeStart, surgeEnd] = surges[i];
            if (surgeStart.getTime() < prevSurgeEnd.getTime()) {
                surges[i - 1][1] = surgeEnd;
                surges.splice(i, 1);
                i--;
            }
        }
        for (const [surgeStart, surgeEnd] of surges) { // add surges to calendar
            const surgeDetails = document.createElement('li');
            surgeDetails.textContent = `Surge: ${timeRangeAsString(surgeStart, surgeEnd)}`;
            dayDetails.appendChild(surgeDetails);
        }

        dayDiv.appendChild(dayDetails);
        calendarDiv.appendChild(dayDiv);
    }
    dayField.value = calendar.day;
    currentDay.scrollIntoView(true);
}
updateCalendar();
