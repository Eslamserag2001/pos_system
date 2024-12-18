import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, interval, map, forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // private baseUrl = 'https://dummyjson.com';

  private baseUrl = 'https://dummyjson.com'; // الرابط الأساسي للـ API

  constructor(private http: HttpClient) {}

  // جلب بيانات السلات (الطلبات)
  getCarts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/carts`);
  }

  // جلب بيانات المنتجات
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  // جلب بيانات المستخدمين
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
}



