
interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  total: number;
}



import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CurrencyPipe } from '@angular/common';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  
  // constructor(private orderService: OrderService, private productService: ProductService) { }

  // previousOrders: any[] = [];  // مصفوفة لتخزين الطلبات السابقة
  // products1 = [];
  // orderItems1: any[] = [];
  // totalAmount1 = 0;
  // orders: any[] = [];
  // orderItems: any[] = []; // قائمة المنتجات المضافة
  // totalAmount = 0;
  // order = {
  //   customerName: '',
  //   product: null,
  //   quantity: 1
  // };
  // products: any[] = [];

  // ngOnInit() {

  //   //   لا يوجد اوردر في api url/جلب-الطلبات-السابقة
  //   this.orderService.getOrders().subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.previousOrders = data; this.orders = data;
  //     },
  //     error: (eror) => {
  //       console.log('the eror=>', eror);

  //     }
  //   }


  //   );

  //   // جلب المنتجات من الخدمة
  //   this.productService.getProducts().subscribe({
  //     next: (res) => {
  //       this.products = res.products;
  //       console.log(res);
  //     },
  //     error: (eror) => {
  //       console.log('the error =>', eror);
  //     }
  //   });
  // }
  // addProductToOrder(product: any): void {
  //   const existingItem = this.orderItems.find(item => item.productName === product.name);
  //   if (existingItem) {
  //     existingItem.quantity++;
  //     existingItem.total = existingItem.quantity * product.price;
  //   } else {
  //     const newItem = {
  //       productName: product.name,
  //       quantity: 1,
  //       price: product.price,
  //       total: product.price
  //     };
  //     this.orderItems.push(newItem);
  //   }
  //   this.calculateTotalAmount();
  // }

  // calculateTotalAmount(): void {
  //   this.totalAmount = this.orderItems.reduce((sum, item) => sum + item.total, 0);
  // }

  // onSubmit(): void {
  //   const orderData = {
  //     items: this.orderItems,
  //     totalAmount: this.totalAmount,
  //     date: new Date().toISOString()
  //   };

  //   this.orderService.submitOrder(orderData).subscribe(
  //     (response) => {
  //       console.log('Order submitted successfully', response);
  //       this.orderItems = [];
  //       this.totalAmount = 0;
  //     },
  //     (error) => {
  //       console.error('Error submitting order', error);
  //     }
  //   );
  // }


  // editOrderItem(item: any): void {
  //   const newQuantity = prompt("Enter new quantity:", item.quantity.toString());
  //   if (newQuantity !== null) {
  //     item.quantity = parseInt(newQuantity, 10);
  //     item.total = item.quantity * item.price;
  //     this.calculateTotalAmount();  // إعادة حساب المبلغ الإجمالي
  //   }
  // }

  // // src/app/orders/orders.component.ts
  // removeOrderItem(item: any): void {
  //   const index = this.orderItems.indexOf(item);
  //   if (index > -1) {
  //     this.orderItems.splice(index, 1);  // إزالة العنصر من المصفوفة
  //     this.calculateTotalAmount();  // إعادة حساب المبلغ الإجمالي بعد الحذف
  //   }
  // }

  orders: any[] = []; // لتخزين الطلبات
  loading: boolean = true; // لعرض مؤقت تحميل أثناء الجلب

  ngOnInit() {
    this.fetchOrders();
  }

  // دالة لجلب الطلبات
  fetchOrders() {
    fetch('https://dummyjson.com/carts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      })
      .then((data) => {
        this.orders = data.carts; // تخزين الطلبات
        this.loading = false; // إخفاء مؤقت التحميل
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        this.loading = false; // إخفاء مؤقت التحميل حتى عند وجود خطأ
      });
  }

}







