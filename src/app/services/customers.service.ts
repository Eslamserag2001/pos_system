import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private apiUrl = 'https://dummyjson.com/users'; // استخدام بيانات المستخدمين كعملاء

  constructor(private http: HttpClient) {}

  // جلب قائمة العملاء
  getCustomers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // إضافة عميل جديد (اختياري للعرض فقط، البيانات لا تُحفظ فعليًا)
  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/add', customer);
  }

  // تعديل بيانات العميل
  updateCustomer(customerId: number, customer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${customerId}`, customer);
  }

  // حذف عميل
  deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${customerId}`);
  }


}
