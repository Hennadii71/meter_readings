import { BASE_URL } from "./api.js";

const signupForm = document.getElementById("signup-form");
const signupUser = document.getElementById("signup-username");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");

const signup = async (event) => {
  try {
    event.preventDefault();
    const username = signupUser.value;
    const email = signupEmail.value;
    const password = signupPassword.value;

    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    error.message;
  }
};

signupForm.addEventListener("submit", signup);
