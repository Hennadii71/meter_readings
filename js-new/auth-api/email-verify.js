// Чистий JS для отримання параметрів з URL

const titleVerify = document.querySelector(".js-title-verify");
const messageVerify = document.querySelector(".js-message-verify");
const linkVerify = document.querySelector(".js-link-verify");

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
const error = urlParams.get("error");

if (error) {
  titleVerify.innerText = "Щось пішло не так";
  messageVerify.innerText =
    "Посилання недійсне або ваш email вже було підтверджено.";
} else if (username) {
  titleVerify.innerText = `Дякуємо, ${decodeURIComponent(username)}!`;
}
