import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem("token")
    })
  }

  constructor(private _http: HttpClient) { }

  API_URI = 'http://127.0.0.1:3000/api/v1'


  getUsers(): Observable<any> {
    return this._http.get<User[]>(`${this.API_URI}/users`, this.httpOptions)
  }

  getUser(id: number|string): Observable<any> {
    return this._http.get<User>(`${this.API_URI}/users/${id}`, this.httpOptions)
  }

  
  saveUser(user: User): Observable<any> {
    return this._http.post<User>(`${this.API_URI}/users`, user, this.httpOptions)
  }

  updateUser(user: User): Observable<any> {
    return this._http.put<User>(`${this.API_URI}/users/${user._id}`, user, this.httpOptions)
  }

  deleteUser(user: User): Observable<any> {
    return this._http.delete<User>(`${this.API_URI}/users/${user._id}`, this.httpOptions)
  }


}
