import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem("token")
    })
  }

  constructor(private _http: HttpClient) { }

  API_URI = 'http://127.0.0.1:3000/api/v1'

  getClients(): Observable<any> {
    return this._http.get<Client[]>(`${this.API_URI}/clients`, this.httpOptions)
  }

  getClient(id: number|string): Observable<any> {
    return this._http.get<Client>(`${this.API_URI}/clients/${id}`, this.httpOptions)
  }

  saveClient(client: Client): Observable<any> {
    return this._http.post<Client>(`${this.API_URI}/clients`, client, this.httpOptions)
  }

  updateClient(client: Client): Observable<any> {
    return this._http.put<Client>(`${this.API_URI}/clients/${client._id}`, client, this.httpOptions)
  }

  deleteClient(client: Client): Observable<any> {
    return this._http.delete<Client>(`${this.API_URI}/clients/${client._id}`, this.httpOptions)
  }



}
