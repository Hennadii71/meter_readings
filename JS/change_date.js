const date = document.querySelector(".js-date");

const currentTime = new Date();

const monthNumber = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const current = {
  date: currentTime.getDate(),
  month: monthNumber[currentTime.getMonth()],
  year: currentTime.getFullYear(),
};

function printConsole() {
  console.log(current.date);
}

function getCurrentDate() {
  date.textContent = `${current.date}.${current.month}.${current.year}`;
}

const changeDate = date.addEventListener("click", getCurrentDate);
