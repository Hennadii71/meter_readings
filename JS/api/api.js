export const BASE_URL = "http://localhost:3000/api";

export const apiFetchObject = async (endpoint, options = {}) => {
  const token = localStorage.getItem("jwt-token");
  options.headers = options.headers || {};
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }
  if (options.body && !(options.body instanceof FormData)) {
    options.headers["Content-Type"] = "application/json";
  }
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (response.status === 401) {
      console.warn("Автентифікація застаріла");
      localStorage.removeItem("jwt-token");
      window.location.replace("/index.html");
      return null;
    }
    return response;
  } catch (error) {
    console.error("Помилка мережі", error);
    throw error;
  }
};
