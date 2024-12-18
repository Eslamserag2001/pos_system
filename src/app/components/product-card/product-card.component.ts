interface data {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  availabilityStatus: string;
  brand?: string; // Optional property
  discountPercentage?: number; // Optional property
  dimensions?: { // Optional nested object
    width: number;
    height: number;
    depth: number;
  };
  images: string[]; // Array of image URLs
  meta: { // Nested object
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  minimumOrderQuantity: number;
  rating?: number; // Optional property
  returnPolicy?: string; // Optional property
  reviews?: Review[]; // Optional array of Review objects (not defined here)
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  warrantyInformation: string;
  weight: number;
}

interface Review {
  comment:string
  date:string
  rating:string
  reviewerEmail:string
  reviewerName:string
}



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProductService } from '../../services/product.service';

Chart.register(...registerables);

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  product!:data
  
  isloaded:boolean=true
  constructor(private ActivatedRoute: ActivatedRoute ,private ProductService:ProductService) { }
  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe((p) => {
        
      this.viewDetails(p.get('id'))
      this.isloaded=false
    })
  }


 

  viewDetails(productId: any) {


    this.ProductService.getspesfproduct(productId).subscribe({
      next:(res)=>{
         console.log('the spesfic=>', res);
        
        this.product=res
        console.log('View details for product ID:',  this.product);
      }
    })
  }






}
