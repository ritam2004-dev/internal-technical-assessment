import api from "./axios";

export const fetchRandomImages = async () => {
  const res = await api.get("/images/random");
  return res.data;
};

export const uploadImage = async (image, title) => {
  const res = await api.post("/images/upload", {
    image,
    title,
  });
  return res.data;
};

export const fetchMyImages = async () => {
  const res = await api.get("/images/myimages");
  return res.data;
};

export const deleteImage = async (id) => {
  await api.delete(`/images/${id}`);
};

export const fetchUserImages = async (username) => {
  const res = await api.get(`/images/user/${username}`);
  return res.data;
};
