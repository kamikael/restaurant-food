// src/types/Product.ts
export type Product = {
  id: string;
  name?: string;
  description?: string;
  price: number | 0;
  quantity: number| 0;
  image?: string;
  link: string
};
