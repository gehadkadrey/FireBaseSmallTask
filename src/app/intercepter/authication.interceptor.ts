import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AccountService } from "../services/account.service";
@Injectable
({
    providedIn:"root"
})
export class authicationInterceptor  implements HttpInterceptor
{
    constructor(private accountService:AccountService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       return   this.accountService.user$.pipe(
              take(1),
              exhaustMap(user=>
                {
                    //if we in register or login we don't need to send token 
                    //if user or token not exist
                    if(!user || !user.token)
                        {
                            // return request as it send without token
                        return next.handle(req);
                        }
                 const modifiedRequest=req.clone(
                    {
                        params:new HttpParams().set("auth",user.token)
                    }
                 )
                 //next here mean to backend or anther interceptor
                 return next.handle(modifiedRequest)
                }
              )
            )
    }
    
}