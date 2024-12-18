import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  product = { name: '', price: 0, stock: 0 };

  constructor(private productService: ProductService) {}

  onSubmit() {
    this.productService.addProduct(this.product).subscribe(
      (res) => {
        console.log('Product added:', res);
        // this.product = { name: '', price: 0, stock: 0 };

      },
      (err) => {
        console.error('Error adding product:', err);
      }
    );
  }





}
