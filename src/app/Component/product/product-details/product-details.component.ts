import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { ProductModel } from '../../../model/productModel';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit ,OnDestroy {

  selectedProduct: ProductModel | null = null;
  constructor(private Productservice:ProductService,private toasterService:ToastrService,
    private cartService:CartService,private router:Router

  ){}
  private productSubscription: Subscription | undefined;


  ngOnInit() {
    this.Productservice.selectedOne$.subscribe(product => {
 this.selectedProduct=product
    });
  }
  ngOnDestroy() {
    if(this.productSubscription){
      this.productSubscription.unsubscribe();
    }
    
  }
  OnAddToCart(product:ProductModel)
  {
    this.cartService.addToCart(product);
    this.router.navigate(['cart'])
  }
}