import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../model/productModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent  implements OnInit{

// @Input() ListOfProduct! :ProductModel[];
ListOfProduct:ProductModel[]=[];
constructor(private productService:ProductService,
  private router:Router,
  private activatedRoute:ActivatedRoute,private toasterService:ToastrService,
  private cartService:CartService
){}
  ngOnInit() {
    this.productService.getProducts().subscribe({
      next:(data:ProductModel[])=>{this.ListOfProduct=data},
      error:error=>{this.toasterService.warning(":; error occurr")}
    })
  }
OnAdd()
{
  const prod:ProductModel={
    id:3,
    productName: 'product3',
    ProductDescription: ' description of product3',
    imagePath: '/assets/images/product3.jpg',
    productCountity: 100,
    productPrice: 250
  }
  this.productService.AddProduct(prod);
}
DisplayDetails(product:ProductModel)
{
//  this.productService.selectedOne.next(product);
this.productService.selectProduct(product);
 this.router.navigate(['Products/details'])
}
OnAddToCart(product:ProductModel)
{
 this.cartService.addToCart(product);
 this.router.navigate(['cart'])
}
}
