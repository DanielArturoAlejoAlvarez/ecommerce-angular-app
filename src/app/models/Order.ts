import { Client } from './Client';
import { Product } from './Product';

export class Order {
  _id: number | string;
  client: Client;
  product: Product;
  price: number;
  qty: number;
  serial: number | string;
  total: number;
  orderItems: [];
}
