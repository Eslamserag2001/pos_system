import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/Dashboard/dashboard.service';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private dashboardService: DashboardService) { }
  // بيانات الإحصائيات
  totalRevenue = 0;
  totalOrders = 0;
  totalCustomers = 0;
  // بيانات الرسم البياني للطلبات
  ordersData: any[] = [];
  // أفضل المنتجات
  topProducts: any[] = [];
  // بيانات المخطط الدائري
  salesAnalytics = {
    completed: 70,
    returned: 20,
    distributed: 10,
  };


  ngOnInit(): void {
    this.loadSalesOverview();
    this.loadTopProducts();
  }
  loadSalesOverview(): void {
    this.dashboardService.getCarts().subscribe(carts => {
      this.totalRevenue = carts.carts.reduce((sum: number, cart: any) => sum + cart.total, 0);
      this.totalOrders = carts.carts.length;
      // console.log('carts is =>', carts);

    });

    this.dashboardService.getUsers().subscribe(users => {
      // console.log('all users=>',users);

      this.totalCustomers = users.total;
    });
  }


  loadTopProducts(): void {
    this.dashboardService.getProducts().subscribe(products => {
      // اختيار أفضل المنتجات بناءً على الطلبات
      this.topProducts = products.products.slice(0, 5); // أعلى 5 منتجات
    });
  }
}