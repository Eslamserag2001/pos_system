import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ReportsService } from '../../services/report/reports.service';
import { InvoicesService } from '../../services/invoices/invoices.service';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  constructor(private reportsService: ReportsService, private invoicesService: InvoicesService) { }

  ngOnInit(): void {
    this.fetchReports();
    this.filterReports();

  }
  salesData: any[] = [];
  totalRevenue: number = 0;
  totalOrders: number = 0;

  reports: any[] = [];
  filteredReports: any[] = [];
  filters = {
    customerName: '', // البحث باستخدام id أو userId
  };

  resetFilters(): void {
    this.filters.customerName = '';
    this.filteredReports = [...this.reports];
  }
  fetchReports(): void {
    this.reportsService.getSalesReports().subscribe({
      next: (data) => {
        console.log(data);
        this.salesData = data.carts;
        this.totalRevenue = this.calculateTotalRevenue(this.salesData);
        this.totalOrders = this.salesData.length;
      },
      error: (error) => {
        console.error('Error fetching reports:', error);
      }, });  }
  calculateTotalRevenue(data: any[]): number {
    return data.reduce((acc, order) => acc + order.total, 0);
  }
  filterReports(): void {
    this.reportsService.getSalesReports().subscribe({
      next: (data) => {
        this.reports = data.carts.map((cart: any) => ({
          id: cart.id,
          userId: cart.userId,
          customerName: `Customer ${cart.userId}`,
          total: cart.total,
          date: new Date().toLocaleDateString(),
        }));
        this.filteredReports = [...this.reports];
      },
      error: (err) => console.error('Error fetching reports:', err),
    });
  }
  applyFilters(): void {
    const { customerName } = this.filters;
    // التصفية باستخدام ID أو User ID
    this.filteredReports = this.reports.filter((report) => {
      const matchesId =
        customerName &&
        (report.id.toString() === customerName || report.userId.toString() === customerName);
      return matchesId;
    }); }
  downloadReport(): void {
    const pdf = new jsPDF();
    pdf.text('Reports', 10, 10);
    let yPosition = 20;
    this.filteredReports.forEach((report, index) => {
      pdf.text(
        `${index + 1}. Invoice ID: ${report.id}, Customer: ${report.customerName}, Total: $${report.total}, Date: ${report.date}`,
        10,
        yPosition
      );
      yPosition += 10;
    });

    pdf.save('reports.pdf');
  }
}



