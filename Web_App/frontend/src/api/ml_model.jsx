import { ML_API } from "./config";


export async function predictApartmentPrice(body) {

  const res = await fetch(`${ML_API}/get-apartment-price-prediction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error("Prediction failed");
  }

  return res.json();
}