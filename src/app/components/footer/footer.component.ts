import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { InvoicesService } from '../../services/invoices/invoices.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  // هذه الدالة تقوم بتبديل الوضع بين داكن وفاتح
  toggleTheme(): void {
    document.body.classList.toggle('dark-mode');
  }

  ngOnInit(): void {
    // يمكن إضافة أي منطق هنا إذا كان الفوتر يتطلب بيانات من API
  }
}