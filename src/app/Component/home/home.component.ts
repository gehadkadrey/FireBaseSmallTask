import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from '../../model/productModel';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ProductList:ProductModel[]=[];
  constructor( private ProductService:ProductService,private accountSevice:AccountService ,private toasterService:ToastrService){}
  ngOnInit() {
    this.accountSevice.user$.subscribe(res=>
      {
        if(res!=null){
          this.ProductService.getProducts().subscribe(
            {
              next:(data:ProductModel[])=>{this.ProductList=data},
              error:error=>{this.toasterService.warning("::error occur"+error)}
            }
          )
        }
      }
    )
  

}








}
