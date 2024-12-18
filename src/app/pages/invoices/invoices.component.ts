import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../../services/invoices/invoices.service';
import { jsPDF } from 'jspdf';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent  implements OnInit{

  invoiceForm!: FormGroup;

  invoices: any[] = [];
  currentInvoice: any = { id: null, customerName: '', total: 0, date: '' };
  showForm: boolean = false;
  isEditing: boolean = false;

  constructor(private invoicesService: InvoicesService, private toastr:ToastrService,  private fb: FormBuilder ) {
    this.invoiceForm = this.fb.group({
      id: [null], // يتم تعبئتها تلقائيًا أثناء التحرير
      customerName: ['', [Validators.required, Validators.minLength(3)]],
      total: [0, [Validators.required, Validators.min(1)]],
      date: ['', Validators.required], // أو يمكن استخدام Date Picker
    });
   }

  ngOnInit(): void {
    this.fetchInvoices();
  }
  fetchInvoices(): void {
    this.invoicesService.getInvoices().subscribe({
      next: (data) => {
        this.invoices = data.carts.map((cart: any) => ({
          id: cart.id,
          customerName: `Customer ${cart.userId}`,
          total: cart.total,
          date: new Date().toLocaleDateString(),
        }));
      },
      error: (err) => console.error('Error fetching invoices:', err),
    });
  }
  emailInvoice(invoiceId: number): void {
    alert(`Sending Invoice ID: ${invoiceId} via email.`);
    // هنا يمكن تنفيذ منطق إرسال البريد الإلكتروني
  }
  downloadInvoice(invoiceId: number): void {
    // هنا يمكن استخدام مكتبة مثل jsPDF لتوليد PDF

    alert(`Downloading PDF for Invoice ID: ${invoiceId} `);

    const pdf = new jsPDF();
    const invoice = this.invoices.find((inv) => inv.id === invoiceId);

    pdf.text(`Invoice ID: ${invoice.id} `, 10, 10);
    pdf.text(`Customer Name: ${invoice.customerName} `, 10, 20);
    pdf.text(`Total: $${invoice.total} `, 10, 30);
    pdf.text(`Date: ${invoice.date} `, 10, 40);

    pdf.save(`Invoice_${invoice.id}.pdf`);
  }
  closeForm(): void {
    this.showForm = false;
    this.currentInvoice = { id: null, customerName: '', total: 0, date: '' };
  }



//الاصل
  //  saveInvoice(): void {
  //    if (this.isEditing) {
  //    //   تحديث الفاتورة
  //      const index = this.invoices.findIndex(inv => inv.id === this.currentInvoice.id);
  //      if (index !== -1) {
  //        this.invoices[index] = { ...this.currentInvoice };
  //        this.toastr.info('good  تحديث فاتوره ')
  //      }
  //    }
  //     else {
  //     //  إضافة فاتورة جديدة
  //      const newId = this.invoices.length ? Math.max(...this.invoices.map(inv => inv.id)) + 1 : 1;
  //      this.invoices.push({ ...this.currentInvoice, id: newId });
  //      this.toastr.info(' إضافة فاتورة جديدة')

  //    }
  //    this.closeForm();
  //  }



// الاصل
  // openInvoiceForm(invoice?: any): void {
  //   this.showForm = true;
  //   if (invoice) {
  //     this.currentInvoice = { ...invoice }; // نسخ بيانات الفاتورة للتحرير
  //     this.isEditing = true;
  //     this.toastr.info( 'تم الفتح openInvoiceForm'  )
  //   } else {
  //     this.currentInvoice = { id: null, customerName: '', total: 0, date: '' };
  //     this.toastr.info( ' ooooops  openInvoiceForm'  )

  //     this.isEditing = false;
  //   }
  // }

  saveInvoice(): void {
    if (this.invoiceForm.invalid) {
      this.toastr.error('Please fill all required fields correctly.');
      return;
    }
  
    const invoiceData = this.invoiceForm.value;
  
    if (this.isEditing) {
      // تحديث الفاتورة
      this.invoicesService.updateInvoice(invoiceData.id, invoiceData).subscribe({
        next: (updatedInvoice) => {
          // تحديث الفاتورة في القائمة
          const index = this.invoices.findIndex((inv) => inv.id === updatedInvoice.id);
          if (index !== -1) {
            this.invoices[index] = { ...updatedInvoice };
          }
          this.toastr.success('Invoice updated successfully.');
          this.closeForm();
        },
        error: () => {
          this.toastr.error('Failed to update the invoice.');
        },
      });
    } else {
      // إضافة فاتورة جديدة
      this.invoicesService.addInvoice(invoiceData).subscribe({
        next: (newInvoice) => {
          this.invoices = [...this.invoices, newInvoice];
          this.toastr.success('Invoice added successfully.');
          this.closeForm();
        },
        error: () => {
          this.toastr.error('Failed to add the invoice.');
        },
      });
    }
  }
  

  openInvoiceForm(invoice?: any): void {
    this.showForm=true
    if (invoice) {
      // تعبئة البيانات في النموذج عند التعديل
      this.invoiceForm.patchValue(invoice);
      this.isEditing = true;
    } else {
      // إعادة ضبط النموذج لإضافة فاتورة جديدة
      this.invoiceForm.reset({
        id: null,
        customerName: '',
        total: 0,
        date: new Date().toISOString().substring(0, 10), // تاريخ اليوم الافتراضي
      });
      this.isEditing = false;
    }
    this.showForm = true; // عرض النموذج
  }
  






  addInvoices(): void {
    // بيانات وهمية لمحاكاة الاستجابة من الـ API
    const dummyData = [
      { id: 1, userId: 10, total: 149 },

    ];

    // تحديد آخر ID في القائمة
    const lastInvoiceId = this.invoices.length > 0
      ? Math.max(...this.invoices.map(invoice => invoice.id))
      : 0;

    // إنشاء فواتير جديدة من البيانات الواردة
    const newInvoices = dummyData.map((data, index) => {
      // التحقق من عدم تكرار الاسم
      const customerName = `Customer ${data.userId}`;
      const isNameUnique = !this.invoices.some(invoice => invoice.customerName === customerName);

      return {
        id: lastInvoiceId + index + 1, // تحديد ID جديد
        customerName: isNameUnique ? customerName : `${customerName} (${lastInvoiceId + index + 10})`,
        total: data.total,
        date: new Date().toLocaleDateString(),
      };
    });

    // إضافة الفواتير الجديدة إلى القائمة الحالية
    this.invoices = [...this.invoices, ...newInvoices];
  }
  deleteInvoice(invoiceId: number): void {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoicesService.deleteInvoice(invoiceId).subscribe({
        next: () => {
          // حذف الفاتورة من المصفوفة المحلية
          this.invoices = this.invoices.filter((inv) => inv.id !== invoiceId);
          this.toastr.success('Invoice deleted successfully.');
        },
        error: () => {
          this.toastr.error('Failed to delete the invoice.');
        },
      });
    }
  }
  
}
