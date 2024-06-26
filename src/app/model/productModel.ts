export class ProductModel
{

   id:number;
   productName!:string;
  ProductDescription!:string;
 imagePath!:string;
 productCountity!:number;
 productPrice!:number;

 constructor( id:number,productName:string,ProductDescription:string, imagePath:string,productCountity:number,productPrice:number){
    this.productName=productName;
    this.ProductDescription=ProductDescription;
    this.imagePath=imagePath;
    this.productCountity=productCountity;
    this.productPrice=productPrice;
    this.id=id;
 }
}