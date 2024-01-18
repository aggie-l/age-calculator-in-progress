const useryear = document.querySelector('#yearInput');
const usermonth = document.querySelector('#monthInput');
const userday = document.querySelector('#dayInput');
const submitBtn = document.querySelector('button');

const resyear = document.querySelector('#resyears');
const resmonth = document.querySelector('#resmonths');
const resday = document.querySelector('#resdays');

const errorDay = document.querySelector('#daySection .errorMessage');
const errorMonth = document.querySelector('#monthSection .errorMessage');
const errorYear = document.querySelector('#yearSection .errorMessage');

const present = new Date();
const currentD = present.getDate();
const currentM = present.getMonth() + 1;
const currentY = present.getFullYear();



submitBtn.addEventListener('click',() => {
    let day = userday.value;
    let month = usermonth.value;
    let year = useryear.value;

    calcyear(day, month, year);
    calcmonth(day, month, year);
    calcdays(day, month, year);
})



function calcyear(day, month, year) {
    if (errmanYear(year) || errman(day, month, year)) {
        return;
    } else {
        let diff;
        if (month > currentM) {
            diff = (currentY - 1) - year;
        } else {
            diff = currentY - year;
        }
        if (diff < 0) {
            alert('Include a valid date');
            return ;
        }
        resyear.textContent = diff;
    }
}



function calcmonth(day, month, year) {
    if (errmanMonth(month) || errman(day, month, year)) {
        return;
    } else {
        let diff;
        if (month <= currentM) {
            diff = currentM - month;
        } 
        else if (month > currentM) {
            diff = 12 - month;
            diff += currentM;
        }
        if (day > currentD)
        {
            --diff
        }
        resmonth.textContent = diff;
    }
}



function calcdays(day, month, year) {
    let monthdays = monthDays(month, year)
    if (errmanDay(day) || errman(day, month, year)) {
        return;
    } else {
        let diff;
        if (day > currentD) {
            diff = monthdays - day;
            diff += currentD;
        }
        else if (day <= currentD)
        {
            diff = currentD - day;
        }
        resday.textContent = diff;
    }
}


function monthDays(month, year) {
    if (month == 2 && leapYear(year)) {
        return 29
    } 
    else if (month == 2 && !leapYear(year)) {
        return 28
    } 
    else if (month == 4 || month == 6 || month == 9 || month == 11) {
        return 30
    } else {
        return 31
    }
}


function leapYear(year) {
    if (year % 4 == 0) {
        return true
    }
}


function errman(day, month, year) {
    let classerrorD = document.getElementById('daySection').classList;
    let classerrorM = document.getElementById('monthSection').classList;
    let classerrorY = document.getElementById('yearSection').classList;
    
    if (day > monthDays(month, year)) {
        errorDay.textContent = 'Must be a valid date';
        classerrorD.add('error');
        classerrorM.add('error');
        classerrorY.add('error');

        return true;
    }
    else {
        errorDay.textContent = '';
        classerrorD.remove('error');
        classerrorM.remove('error');
        classerrorY.remove('error');

        return false;
    }
}


function errmanYear(year) {
    let classerrorY = document.getElementById('yearSection').classList;
    if (year == 0) {
        errorYear.textContent = "This field is required";
        classerrorY.add('error');
        return true;
    }
    else if (year > currentY) {
        errorYear.textContent = 'Must be in the past';
        return true;
    }
    else {
        classerrorY.remove('error');
        errorYear.textContent = '';
        return false;
    }
}


function errmanMonth(month) {
    let classerrorM = document.getElementById('monthSection').classList;
    
    if (month == 0) {
        classerrorM.add('error');
        errorMonth.textContent = 'This field is required';
        return true;
    }
    else if (month > 12) {
        errorMonth.textContent = 'Must be a valid month';
        return true;
    }
    else {
        classerrorM.remove('error');
        errorMonth.textContent = '';
        return false;
    }
}


function errmanDay(day) {
    let classerrorD = document.getElementById('daySection').classList;
    if (day == 0) {
        classerrorD.add('error');
        errorDay.textContent = 'This field is required';
        return true
    }
    else if (day > 31) {
        errorDay.textContent = 'Must be a valid day';
        return true;
    }
    else {
        classerrorD.remove('error');
        errorDay.textContent = '';
        return false;
    }
}