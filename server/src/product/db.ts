/**
 * Simple in store database for products
 */

export const database: Product[] = [
  {
    id: 1,
    name: "Coke",
    price: 20,
    stock: 10,
  },
  {
    id: 2,
    name: "Pepsi",
    price: 25,
    stock: 10,
  },
  {
    id: 3,
    name: "Dew",
    price: 30,
    stock: 10,
  },
];

export const fetchproducts = async (): Promise<Product[]> => {
  return database;
};
