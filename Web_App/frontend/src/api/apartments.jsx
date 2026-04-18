import { API } from './config';

export async function fetchApartments() {

  const res = await fetch(`${API}/apartments`);

  return res.json();

}

export async function createApartment(data) {

  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("city", data.city);
  formData.append("rooms", data.rooms);
  formData.append("area", data.area);
  formData.append("price", data.price);
  formData.append("renovated", data.renovated);
  formData.append("garage", data.garage);
  formData.append("balcony", data.balcony);
  formData.append("new_building", data.new_building);

  if (data.image) {
    formData.append("image", data.image);
  }

  const res = await fetch(`${API}/apartments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  return res.json();
}

export const deleteApartment = async (id) => {

  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/apartments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Delete failed");
  }

};