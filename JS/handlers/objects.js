import {
  getAllObjects,
  createObject,
  deleteObjectById,
  changeNameObject,
} from "../api/objects-api.js";

const refs = {
  formCreateObject: document.querySelector(".js-form-create-object"),
  inputNameObject: document.querySelector(".js-object-name"),
  objectList: document.querySelector(".js-object-list"),
};

const handleGetAllObjects = async () => {
  try {
    const response = await getAllObjects();
    if (response && response.ok) {
      const objects = await response.json();
      console.log(objects);
      if (refs.objectList) {
        refs.objectList.innerHTML = "";
        const objectListItem = objects
          .map((obj) => {
            return `
            <li class="object__list-item" data-id="${obj._id}">
              <button style="border: none;">${obj.objectName}</button>
              <button class="js-btn-delete" style="margin-left: 10px;">Видалити</button>
            </li>
          `;
          })
          .join(" ");
        refs.objectList.insertAdjacentHTML("beforeend", objectListItem);
      }
    }
  } catch (error) {
    console.error("Не вдалося завантажити об'єкти", error);
  }
};

const handleCreateObject = async (event) => {
  try {
    event.preventDefault();
    const objectName = refs.inputNameObject.value.trim();
    if (!objectName) {
      alert("Введіть ім'я об'єкту");
      return;
    }
    const response = await createObject(objectName);
    if (response && response.ok) {
      alert(`Об'єкт додано`);
      const newObject = await response.json();

      refs.inputNameObject.value = "";
      console.log(newObject);
      handleGetAllObjects();
    }
  } catch (error) {
    console.error("Помилка при додаванні", error);
  }
};

const handleChangeNameObject = async (event) => {};

const handleDeleteObject = async (event) => {
  if (event.target.classList.contains("js-btn-delete")) {
    const objectItem = event.target.closest("li");
    const objectId = objectItem.dataset.id;

    if (confirm(`Ви хочете видалити об'єкт`)) {
      try {
        const response = await deleteObjectById(objectId);
        if (response && response.ok) {
          objectItem.remove();
        }
      } catch (error) {}
    }
  }
};

handleGetAllObjects();
refs.formCreateObject.addEventListener("submit", handleCreateObject);
refs.objectList.addEventListener("click", handleDeleteObject);
