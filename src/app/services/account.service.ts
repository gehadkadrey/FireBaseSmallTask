import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponseData } from '../model/IAuthResponseData';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public isAuthenticated = false;
  private user = new BehaviorSubject<User | null>(null);
user$ = this.user.asObservable();
private apiKey='AIzaSyDBRT5sTI9RMITdVQk-JAuCZ13mCfLrv94'
  constructor(private httpClient: HttpClient) { }
  //sign in
  login(email: string, password: string) {
    this.isAuthenticated = true;
    return this.httpClient.post<IAuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,{
      //send data to api 
      email:email,
      password:password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),tap(responseData=>
      {
        this.handleAuth(responseData)
      }
    
    ));

  }
////////////////////////////////////////////////////////////////////////////////////////////

  //signup //دى صح بس هنعمل طريقه تانيه
  // register(email: string, password: string) {

  //   return this.httpClient.post<IAuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true
  //   }).pipe(catchError(errorResponse => {
  //       let errorMessage = "Unknown Error";
  //       if (!errorResponse.error.error || !errorResponse.error) {
  //         return throwError(() => errorMessage);
  //       }
  //       switch (errorResponse.error.error.message) {
  //         case 'EMAIL_EXISTS':
  //           errorMessage = "Email already exists";
  //           break;
  //       }
  //       return throwError(() => errorMessage);
  //     })
  //   );
  // }

// let errorMessage=" Unknown Error";
// if(!errorRespose.error.error || !errorRespose.error)
// {
// return throwError(() => errorMessage)
// }
///////////////////////////////////////////////////////////////////////////////////
//signup
register(email: string, password: string) {

  return this.httpClient.post<IAuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, {
    email: email,
    password: password,
    returnSecureToken: true
    //if there is error will catch in catch error if not return data from post method will return 
    ///tap  used to assign  user data to anther variable
  }).pipe(catchError(this.handleError),tap(responseData=>
    {
      this.handleAuth(responseData)
    }
  
  ));
}

private handleError(errorResponse:HttpErrorResponse)
{
  let errorMessage = "Unknown Error";
  if (!errorResponse.error.error || !errorResponse.error) {
    return throwError(() => errorMessage);
  }
  switch (errorResponse.error.error.message) {
   
    case 'EMAIL_EXISTS':
      errorMessage = "Email already exists";
      break;
      case 'EMAIL_NOT_FOUND':
      errorMessage=" can't found email";
      break;
      case 'INVALID_PASSWORD:':
        errorMessage=" invalid password";
        break;
        case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage=" invalid email or password";
        break;
  }
  return throwError(() => errorMessage);
}
private handleAuth(responseData:any)
{
  const _expiationDate=new Date(new Date().getTime()+ + responseData.expiresIn*1000)
  const user=new User(
    responseData.localId,
    responseData.email,
    responseData.idToken,
    _expiationDate
  )
this.user.next(user);
}
logout() {
  this.isAuthenticated = false;
  this.user.next({_token:"",_tokenExppirationDate:new Date(),email:"",id:"",token:""})
}

isLoggedIn(): boolean {
  return this.isAuthenticated;
}
}
