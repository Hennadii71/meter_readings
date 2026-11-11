import { BASE_URL } from "../api/api.js";

const signinForm = document.getElementById("signin-form");
const signinEmail = document.getElementById("signin-email");
const signinPassword = document.getElementById("signin-password");
const errorText = document.getElementById("errorContainer");

if (localStorage.getItem("jwt-token")) {
  window.location.replace("/html/home-page.html");
}

errorText.textContent = "";

const signin = async (event) => {
  try {
    event.preventDefault();
    const email = signinEmail.value;
    const password = signinPassword.value;

    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      // Отримання тексту помилки з сервера
      // const errorData = await response.json();
      // const errorMessage = errorData.message;
      errorText.textContent = "Невірний логін або пароль";
      return;
    }
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("jwt-token", data.token);
      console.log("Токен успішно збережено");
      window.location.replace("/html/home-page.html");
    }
  } catch (error) {
    errorContainer.textContent =
      "Не вдалося з’єднатися з сервером. Перевірте підключення.";
  }
};

signinForm.addEventListener("submit", signin);
