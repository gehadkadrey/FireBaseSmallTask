import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { IAuthResponseData } from '../../../model/IAuthResponseData';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  isAuthenticated:boolean=false;

  constructor(public authService: AccountService, private router: Router, private toaster: ToastrService) { }
  ngOnInit(): void {
    this.checkAuthenticationStatus();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkAuthenticationStatus();
      }
    });
  }

  private checkAuthenticationStatus(): void {
    const currentUrl = this.router.url;
    this.isAuthenticated = currentUrl === '/login';
  }
  onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) { return; }
    else {

      const email = loginForm.value.email;
      const password = loginForm.value.password;
     let authObservable:Observable<IAuthResponseData>;
      if (this.isAuthenticated) {
       // login
      authObservable= this.authService.login(email, password);

     }
      else  {
        //register //if false mean register and not login untill known
       authObservable= this.authService.register(email, password);
      }
      authObservable.subscribe({
        next: (data: IAuthResponseData) => { 
          this.toaster.success("::Done sucessfully"),
          this.router.navigate(['/Products'])
         },
        error: errorMessage => { this.toaster.warning(errorMessage) }
      });
      
    loginForm.reset();

    }



  }

}

