import { CanActivateFn, Router} from '@angular/router';
import { AccountService } from '../services/account.service';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';

@Injectable(
  {
  providedIn:"root"
  }
)


class auth{
  constructor(private accounntService:AccountService,private router:Router){}
  CanActivate():boolean|Observable<boolean>
{
  if(this.accounntService.isLoggedIn())
    {
      return true;
    }
    else
    {
      this.router.navigate(['/login']);
      return false;
    }
}
}
export const authGuard: CanActivateFn = (route, state) => {
  // return true;
  console.log(inject(auth).CanActivate())
return inject(auth).CanActivate();

};
