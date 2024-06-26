import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnDestroy ,OnInit {
 private subscription: Subscription | undefined;
  isAuth:boolean=false;
 //isHide:boolean=true;
  constructor(public accountService:AccountService,private router:Router){}
  ngOnInit() {
   this.subscription =this.accountService.user$.subscribe({
    next:user=>{ this.isAuth= user?.email ?true:false}
   })
 
  }
  ngOnDestroy() {
   if(this.subscription)
    {
      this.subscription.unsubscribe();
    }
  }

  onLogout()
  {
    this.accountService.logout();
    this.isAuth=false;
    this.router.navigate(['/login'])
  }
}