import { BASE_URL } from "../api/api.js";

const logoutButton = document.querySelector(".logout-button");

const logout = async () => {
  const token = localStorage.getItem("jwt-token");
  try {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.removeItem("jwt-token");
    window.location.replace("/index.html");
  } catch (error) {
    console.error(error.message);
  }
};

logoutButton.addEventListener("click", logout);
