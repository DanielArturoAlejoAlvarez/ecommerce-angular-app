import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem("token")
    })
  }

  constructor(private _http: HttpClient) {}

  API_URI = 'http://127.0.0.1:3000/api/v1';

  getProducts(): Observable<any> {
    return this._http.get<Product[]>(`${this.API_URI}/products`, this.httpOptions);
  }

  getProduct(id: number|string): Observable<any> {
    return this._http.get<Product>(`${this.API_URI}/products/${id}`, this.httpOptions);
  }

  saveProduct(product: Product): Observable<any> {
    return this._http.post<Product>(`${this.API_URI}/products`, product, this.httpOptions);
  }

  updateProduct(product: Product): Observable<any> {
    return this._http.put<Product>(`${this.API_URI}/products/${product._id}`, product, this.httpOptions);
  }

  deleteProduct(product: Product): Observable<any> {
    return this._http.delete<Product>(`${this.API_URI}/products/${product._id}`, this.httpOptions);
  }
}
