import { apiFetchObject } from "./api.js";

export const getAllObjects = async () => {
  return await apiFetchObject("/objects");
};

export const createObject = async (objectName) => {
  return await apiFetchObject("/objects", {
    method: "POST",
    body: JSON.stringify({ objectName }),
  });
};

export const changeNameObject = async (id) => {
  return await apiFetchObject(`/objects/${id}`, {
    method: "PUT",
    body: JSON.stringify({ objectName }),
  });
};

export const deleteObjectById = async (id) => {
  return await apiFetchObject(`/objects/${id}`, { method: "DELETE" });
};
