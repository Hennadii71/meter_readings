const date = document.querySelectorAll(".js-date");
console.log(typeof date);

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

let currentDate = [];

[].map.call(date, (el) => {
  currentDate.push(el);
});

for (let index of currentDate) {
  index.textContent = localStorage.getItem("date");
}

// [].forEach.call(date, (el) => {
//   el.addEventListener("click", () => {
//     localStorage.setItem(
//       "date",
//       `${current.date}.${current.month}.${current.year}`
//     );
//     el.textContent = localStorage.getItem("date");
//   });
// });
