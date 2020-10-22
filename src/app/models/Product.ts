import { Category } from './Category';

export class Product {
  _id: number | string;
  code: String;
  name: String;
  excerpt: String;
  description: String;
  price: number;
  stock: number;
  image: String;
  category: Category;
  status: Boolean;
}
