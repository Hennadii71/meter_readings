const refs = {
  date: document.querySelector(".js-date"),
  dateItem: document.querySelectorAll(".js-date__item"),
};

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

const dateSavingMeters = {};

initDateSavingMeters();

refs.date.addEventListener("click", createNewDate);

function createNewDate(event) {
  if (event.target.nodeName !== "SPAN") {
    return;
  }
  event.target.textContent = `${current.date}.${current.month}.${current.year}`;
  dateSavingMeters[event.target.getAttribute("data-notation")] =
    event.target.textContent;

  localStorage.setItem("date", JSON.stringify(dateSavingMeters));
}

function initDateSavingMeters() {
  let persistedDate = localStorage.getItem("date");
  if (!persistedDate) {
    return;
  }
  persistedDate = JSON.parse(persistedDate);
  Object.entries(persistedDate).forEach(([name, value]) => {
    dateSavingMeters[name] = value;
    [].forEach.call(refs.dateItem, (element) => {
      if (element.getAttribute("data-notation") === name)
        element.textContent = value;
    });
  });
}
