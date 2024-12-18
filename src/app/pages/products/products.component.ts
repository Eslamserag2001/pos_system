import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { error } from 'console';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products!: any[] ;
  errorMessage: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.fetchProducts();
    // console.log('productis=>', this.products);
    
  }

  fetchProducts() {
    this.productService.getProducts().subscribe({   
      next: (data) => {this.products = data.products; console.log('Products:', this.products); },
      error: (error) => {
         console.error('Error fetching products:', error)  
         this.errorMessage = 'Failed to load products.';

        
        ;}


    });
     
  }


  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p.id !== productId);
      },
      error: (error) => {
        console.error('Error deleting product:', error);
        this.errorMessage=error
      },
    });
  }


















}
