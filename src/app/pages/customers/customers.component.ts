import { Component } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  constructor(private customersService: CustomersService, private fb: FormBuilder   ) {}

  customers: any[] = [];
  errorMessage: string = '';
  customerForm!: FormGroup;
  isEditMode: boolean = false;
  currentCustomerId: number | null = null;

  ngOnInit(): void {
    this.fetchCustomers();
    this.initializeForm();
  }
 // جلب العملاء
  fetchCustomers(): void {
    this.customersService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data.users;
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
        this.errorMessage = 'Failed to load customers.';
      },
    });
  }
   // تهيئة النموذج
  initializeForm(): void {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }
  // تعبئة النموذج لتعديل العميل
  editCustomer(customer: any): void {
    this.isEditMode = true;
    this.currentCustomerId = customer.id;
    this.customerForm.patchValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
    });
  }


  deleteCustomer(customerId: number): void {
    this.customersService.deleteCustomer(customerId).subscribe({
      next: () => {
        this.customers = this.customers.filter((c) => c.id !== customerId);
      },
      error: (error) => {
        console.error('Error deleting customer:', error);
      },
    });
  }
   // إرسال النموذج
   onSubmit(): void {
    if (this.customerForm.invalid) return;

    const customerData = this.customerForm.value;

    if (this.isEditMode && this.currentCustomerId) {
      // تعديل العميل
      this.customersService
        .updateCustomer(this.currentCustomerId, customerData)
        .subscribe({
          next: () => {
            this.fetchCustomers();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error updating customer:', error);
          },
        });
    } else {
      // إضافة عميل جديد
      this.customersService.addCustomer(customerData).subscribe({
        next: (data) => {
          this.customers.push(data);
          this.resetForm();
        },
        error: (error) => {
          console.error('Error adding customer:', error);
        },
      });
    }
  }

  // إعادة تعيين النموذج
  resetForm(): void {
    this.isEditMode = false;
    this.currentCustomerId = null;
    this.customerForm.reset();
  }

}
