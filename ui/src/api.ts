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
