import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators'
import { Names } from 'src/app/enum/names';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  base_url = Names.db_name;

  access_token = sessionStorage.getItem('access_token');
  
  login_url = `${this.base_url}/api/users/login`;

  logout_url = `${this.base_url}/api/users/logout`;

  IsLogin_url = `${this.base_url}/api/users/isLogin`;

  role_change_url = `${this.base_url}/api/users/accessAdmin`;

  forgot_pass_url = `${this.base_url}/api/users/forgetPassword`;

  reset_pass_url = `${this.base_url}/api/users/resetPassword`;

  constructor(private http:HttpClient) { }

  loginUser(data:any): Observable<any>{
    return this.http.post<any>(this.login_url, data)
    .pipe(
      map(data => {
        return data;
      }),
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  handleError(error:HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }


  logOut(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.logout_url, data, {headers: httpHeaders})
    .pipe(catchError(this.handleError));
  }

  role_change(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.role_change_url, data, {headers: httpHeaders});
  }

  IsLogin(data: any) {
    const httpHeaders = new HttpHeaders().set("Authorization", "Bearer "+ this.access_token);
    return this.http.post<any>(this.IsLogin_url, data, {headers: httpHeaders})
    .pipe(catchError(this.handleError));
  }

  forgot_pass(data: any) {
    return this.http.post<any>(this.forgot_pass_url, data)
    .pipe(catchError(this.handleError));
  }

  reset_pass(data: any) {
    return this.http.post<any>(this.reset_pass_url, data)
    .pipe(catchError(this.handleError));
  }
}

