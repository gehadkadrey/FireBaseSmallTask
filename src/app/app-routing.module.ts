import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { ProductComponent } from './Component/product/product.component';
import { ProductDetailsComponent } from './Component/product/product-details/product-details.component';
import { CartComponent } from './Component/cart/cart.component';

import { authGuard } from './gaurd/auth.guard';
import { AuthComponent } from './Component/Account/auth/auth.component';

const routes: Routes = [
  {path:'' ,component:HomeComponent},
  {path:'cart' ,component:CartComponent,canActivate:[authGuard]},
  {path:'Products',component:ProductComponent,canActivate:[authGuard] },
  {path:'register',component: AuthComponent},
  { path: 'login', component: AuthComponent },
  { path:'Products/details',component:ProductDetailsComponent ,canActivate:[authGuard]},
 

];
// 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
