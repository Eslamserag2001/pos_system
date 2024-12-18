import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  // private baseUrl = 'https://dummyjson.com';
  // constructor(private http: HttpClient) {}
  // getInvoices(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/carts`);
  // }
  // generateInvoice(orderId: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/carts/${orderId}`);
  // }
  




  private baseUrl = 'https://dummyjson.com/carts'; // رابط الـ API

  constructor(private http: HttpClient) {}

  // 1. جلب الفواتير
  getInvoices(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
  // 2. إضافة فاتورة جديدة
  addInvoice(invoice: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, invoice);
  }
// الاصل
  // 3. تحديث فاتورة موجودة
  // updateInvoice(invoice: any): Observable<any> {
  //   const url = `${this.baseUrl}/${invoice.id}`;
  //   return this.http.put<any>(url, invoice);
  // }

  updateInvoice(invoiceId: number, updatedInvoice: any): Observable<any> {
    const url = `${this.baseUrl}/carts/${invoiceId}`; // استخدام endpoint المناسب للتحديث
    return this.http.put<any>(url, updatedInvoice);
  }
  
  


  // 4. حذف فاتورة
  deleteInvoice(invoiceId: number): Observable<any> {
    const url = `${this.baseUrl}/${invoiceId}`;
    return this.http.delete<any>(url);
  }










}

