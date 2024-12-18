import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import Commerce from '@chec/commerce.js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';




@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'https://dummyjson.com';
  getProducts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/products`
  
  );
  }

  addProduct(newProduct: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/products/add`, newProduct);
  }

  updateProduct(id: number, updatedProduct: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/products/${id}`, updatedProduct);
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/products/${id}`);
  }

  getOrders(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/carts`);
 
  }

  getspesfproduct(id:number):Observable<any>{
    return  this.httpClient.get(`${this.baseUrl}/products/${id}` )
  }


}



