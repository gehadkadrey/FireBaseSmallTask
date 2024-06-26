import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Component/home/home.component';
import { ProductComponent } from './Component/product/product.component';
import { ProductDetailsComponent } from './Component/product/product-details/product-details.component';
import { HeaderComponent } from './Component/header/header.component';
import { FooterComponent } from './Component/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CartComponent } from './Component/cart/cart.component';
import { AuthComponent } from './Component/Account/auth/auth.component'
import { FormsModule } from '@angular/forms';
import { authicationInterceptor } from './intercepter/authication.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailsComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added

  ],
  providers: [
    provideClientHydration(),
    {
      provide:HTTP_INTERCEPTORS,
      useClass:authicationInterceptor,
      multi:true
    }
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
