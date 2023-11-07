const daysInMonth = new Map([
  [0, 31],
  [1, 28],
  [2, 31],
  [3, 30],
  [4, 31],
  [5, 30],
  [6, 31],
  [7, 31],
  [8, 30],
  [9, 31],
  [10, 30],
  [11, 31],
]);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

const datePicker = document.querySelector(".date-picker");
const datesContainer = document.querySelector(".dates-container");
const days = document.querySelector(".days");
const fullDate = document.querySelector(".full-date");
const monthYearBox = document.querySelector(".mth-year-box");
const nxt_mth = document.querySelector(".nxt");
const prev_mth = document.querySelector(".prev");

nxt_mth.addEventListener("click", (e) => {
  ++month;
  if (month > 11) {
    month = 0;
    ++year;
  }
  populateDates();
  monthYearBox.textContent = months[month] + " " + year;
});

prev_mth.addEventListener("click", (e) => {
  --month;
  if (month < 0) {
    month = 11;
    --year;
  }
  monthYearBox.textContent = months[month] + " " + year;
  populateDates();
});

datePicker.addEventListener("click", toggleCalender);
fullDate.textContent =
  (day < 10 ? "0" + day : day) +
  " / " +
  (month + 1 < 10 ? "0" + month + 1 : month + 1) +
  " / " +
  year;

monthYearBox.textContent = months[month] + " " + year;

function toggleCalender(e) {
  if (checkEventPathForClass(e.composedPath(), "calender")) {
    datesContainer.classList.add("active");
  } else {
    datesContainer.classList.remove("active");
  }
}

function checkEventPathForClass(path, selector) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }
  return false;
}

const populateDates = () => {
  days.innerHTML = "";
  for (let i = 0; i < daysInMonth.get(month); ++i) {
    const day_ele = document.createElement("div");
    day_ele.classList.add("day");
    if (
      selectedDay === i + 1 &&
      selectedYear === year &&
      selectedMonth === month
    ) {
      day_ele.classList.add("selected");
    }
    day_ele.textContent = i + 1;

    day_ele.addEventListener("click", function () {
      selectedDate = Number(i + 1) + "/" + Number(month + 1) + "/" + year;
      selectedDay = i + 1;
      selectedMonth = month;
      selectedYear = year;
      fullDate.textContent = formatDate(selectedDate);
      fullDate.dataset.value = selectedDate;
      populateDates();
    });
    days.appendChild(day_ele);
  }
};

populateDates();

function formatDate(d) {
  const arr = d.split("/");
  if (Number(arr[0]) < 10) {
    arr[0] = "0" + arr[0];
  }
  if (arr[1] < 10) {
    arr[1] = "0" + arr[1];
  }
  return arr[0] + " / " + arr[1] + " / " + arr[2];
}
