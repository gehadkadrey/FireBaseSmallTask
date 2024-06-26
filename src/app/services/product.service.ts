import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../model/productModel';
import { BehaviorSubject, Observable, Subject, exhaustMap, map, retry, take } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url='https://productswebsite-f11ed-default-rtdb.firebaseio.com/products.json';
  constructor(private httpClient:HttpClient,private  accountService:AccountService) { }


  private selectedOne = new BehaviorSubject<ProductModel | null>(null);
selectedOne$ = this.selectedOne.asObservable();
selectProduct(product: ProductModel) {
  
  this.selectedOne.next(product);
}




getProducts(): Observable<ProductModel[]> {
//هنا بقول لو فى user 
//روح هات الداتا

return  this.accountService.user$.pipe(
  take(1),
  exhaustMap(user=>
    {
      return this.httpClient.get<{ [key: string]: ProductModel }>(this.url,{
        //send token beacuse we make rule read and write "auth != null"
         // params:new HttpParams().set("auth",user?.token!=null?user.token:"")
        }).pipe(
          map((response: { [key: string]: ProductModel }) => {
            const products: ProductModel[] = [];
            for (const key in response) {
              if (response.hasOwnProperty(key)) {
                products.push({ ...response[key]});
              }
            }
            return products;
          })
        );
    }))






}

  AddProduct(product:ProductModel)
  {
    this.httpClient.post(this.url,product).subscribe(res=>
      {
       // console.log(res)
      }
    )
  }
}
