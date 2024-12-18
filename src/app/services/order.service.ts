import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'https://dummyjson.com';  // استخدم رابط الـ API الخاص بك
  private apiUrl = 'https://dummyjson.com/carts/add'; // URL لإضافة الطلبات إلى DummyJSON
  private apiUrl_order = 'https://dummyjson.com/orders';  // URL API الافتراضي لجلب الطلبات
  constructor(private httpClient: HttpClient) { }

  getcart(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/carts`);
  }

  add_cart(orderItems: any[]): Observable<any> {
    const payload = {
      products: orderItems.map(item => ({ productId: item.productId, quantity: item.quantity }))

    };
    return this.httpClient.post(this.apiUrl, payload);
  }
 // دالة لإرسال الطلب order
 submitOrder(orderData: any): Observable<any> {
  return this.httpClient.post(this.apiUrl_order, orderData);
}

 // دالة لجلب جميع الطلبات السابقة
 getOrders(): Observable<any> {
    // return this.httpClient.get(this.apiUrl_order);  // API لجلب الطلبات
  //  return this.httpClient.get('https://dummyjson.com/products');  // API لجلب الطلبات
  return of(this.mockOrders);  // إرجاع البيانات الوهمية كمصدر Observable


}


private mockOrders = [
  { id: 1, customer: 'John Doe', total: 120, items: 2 },
  { id: 2, customer: 'Jane Smith', total: 75, items: 1 },
  { id: 3, customer: 'Alice Johnson', total: 200, items: 5 },
  { id: 4, customer: 'tyler alison ', total: 180, items: 3 },
  { id: 5, customer: 'andro kolie', total: 75, items: 1 },
  { id: 6, customer: 'tomas donaled', total: 300, items: 6 },
];


}







