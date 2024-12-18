import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, interval, map,forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  // private baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  // getDashboardStats() {
  //   const users$ = this.http.get<any>(`${this.baseUrl}/users`);
  //   const products$ = this.http.get<any>(`${this.baseUrl}/products`);
  //   const carts$ = this.http.get<any>(`${this.baseUrl}/carts`);

  //   return forkJoin([users$, products$, carts$]).pipe(
  //     map(([users, products, carts]) => {
  //       const totalUsers = users.total || users.length;
  //       const totalProducts = products.total || products.length;
  //       const totalCarts = carts.total || carts.length;
  //       const totalCartValue = carts.carts.reduce(
  //         (sum: number, cart: any) => sum + cart.total,
  //         0
  //       );

  //       return {
  //         totalUsers,
  //         totalProducts,
  //         totalCarts,
  //         totalCartValue,
  //       };
  //     })
  //   );
  // }
}








 