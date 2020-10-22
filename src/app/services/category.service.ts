import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem("token")
    })
  }

  constructor(private _http: HttpClient) { }


  API_URI = 'http://127.0.0.1:3000/api/v1'

  getCategories(): Observable<any> {
    return this._http.get<Category[]>(`${this.API_URI}/categories`, this.httpOptions)
  }

  getCategory(id: number|string): Observable<any> {
    return this._http.get<Category>(`${this.API_URI}/categories/${id}`, this.httpOptions)
  }

  saveCategory(category: Category): Observable<any> {
    return this._http.post<Category>(`${this.API_URI}/categories`, category, this.httpOptions)
  }

  updateCategory(category: Category): Observable<any> {
    return this._http.put<Category>(`${this.API_URI}/categories/${category._id}`, category, this.httpOptions)
  }

  deleteCategory(category: Category): Observable<any> {
    return this._http.delete<Category>(`${this.API_URI}/categories/${category._id}`, this.httpOptions)
  }

  
}
