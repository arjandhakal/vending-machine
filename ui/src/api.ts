import { apiUrl } from "./constants";

export async function fetchProductsAPI() {
  const url = apiUrl + "/product/v1";
  const response = await fetch(url);
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message);
  }
  return result;
}

export async function fetchBalanceAPI() {
  const url = apiUrl + "/balance/v1";
  const response = await fetch(url);
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message);
  }
  return result;
}

export async function insertBalanceAPI(data: { type: string; amount: number }) {
  const { type, amount } = data;
  const url = apiUrl + "/balance/v1";
  const body = JSON.stringify({ type, amount });
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: "PUT",
    headers,
    body,
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
}
