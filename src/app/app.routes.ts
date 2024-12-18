import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { LoginComponent } from './pages/login/login.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent  },
  { path: 'add-product', component: AddProductComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'orders', component: OrdersComponent  },
  { path: 'settings', component: SettingsComponent  },
  {path:'footer',component:FooterComponent },
  {path:'productcard/:id',component:ProductCardComponent },
  {path:'login',component:LoginComponent },
  {path:'report',component:ReportsComponent },
  {path:'setting',component:SettingsComponent },
  {path:'customer',component:CustomersComponent },
  {path:'invoices',component:InvoicesComponent },
];


export class AppRoutingModule { }
