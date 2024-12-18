import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'https://dummyjson.com';




  getSalesReports():Observable<any> {
    return this.http.get(`${this.baseUrl}/carts`);
  }
}
