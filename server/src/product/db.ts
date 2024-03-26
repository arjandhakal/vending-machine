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

export const updateMany = async (
  updates: Partial<Product>[],
): Promise<Product[]> => {
  updates.forEach((update) => {
    const productToUpdate = database.find(
      (product) => product.id === update.id,
    );
    if (productToUpdate) {
      Object.assign(productToUpdate, update);
    }
  });
  return database;
};

export const updateProductById = async (
  productId: number,
  update: Partial<Product>,
): Promise<Product> => {
  const productToUpdate = database.find((product) => product.id === productId);
  if (!productToUpdate) {
    throw new Error("Trying to update a non existing product");
  }
  Object.assign(productToUpdate, update);
  return productToUpdate;
};

export const fetchProductById = async (
  productId: number,
): Promise<Product | undefined> => {
  return database.find((product) => product.id === productId);
};
