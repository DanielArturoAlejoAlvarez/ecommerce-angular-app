import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem("token")
    })
  }

  constructor(private _http: HttpClient) {}

  API_URI = 'http://127.0.0.1:3000/api/v1';

  getRoles(): Observable<any> {
    return this._http.get<Role[]>(`${this.API_URI}/roles`, this.httpOptions);
  }

  getRole(id: number | string): Observable<any> {
    return this._http.get<Role>(`${this.API_URI}/roles/${id}`, this.httpOptions);
  }

  saveRole(role: Role): Observable<any> {
    return this._http.post<Role>(`${this.API_URI}/roles`, role, this.httpOptions);
  }

  updateRole(role: Role): Observable<any> {
    return this._http.put<Role>(`${this.API_URI}/roles/${role._id}`, role, this.httpOptions);
  }

  deleteRole(role: Role): Observable<any> {
    return this._http.delete<Role>(`${this.API_URI}/roles/${role._id}`, this.httpOptions);
  }
}
