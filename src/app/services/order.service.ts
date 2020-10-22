import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    })
  }

  constructor(private _http: HttpClient) { }


  API_URI = 'http://127.0.0.1:3000/api/v1'

  getOrders(): Observable<any> {
    return this._http.get<Order[]>(`${this.API_URI}/orders`, this.httpOptions)
  }

  getOrder(id: number|string): Observable<any> {
    return this._http.get<Order>(`${this.API_URI}/orders/${id}`, this.httpOptions)
  }

  saveOrder(order: Order): Observable<any> {
    return this._http.post<Order>(`${this.API_URI}/orders`, order, this.httpOptions)
  }

  updateOrder(order: Order): Observable<any> {
    return this._http.put<Order>(`${this.API_URI}/orders/${order._id}`, order, this.httpOptions)
  }

  deleteOrder(order: Order): Observable<any> {
    return this._http.delete<Order>(`${this.API_URI}/orders/${order._id}`, this.httpOptions)
  }

}
