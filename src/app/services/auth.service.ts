import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  constructor(private _http: HttpClient) { }

  API_URI = 'http://127.0.0.1:3000/api/v1'

  login(user: any): Observable<any> {
    return this._http.post(`${this.API_URI}/auth/login`, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }
}
