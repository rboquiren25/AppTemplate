import { HomeComponent } from './../components/home/home.component';
import { AppComponent } from './../components/app/app.component';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, Headers, RequestMethod } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt'; 
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  currentUser: any;
  

  constructor(private http: Http) {
    let token = localStorage.getItem('token');
    if (token) {
      let jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  login(credentials) { 
    
    let myHeaders = new Headers({'Content-Type':'application/x-www-form-urlencoded','Accept':'application/x-www-form-urlencoded',"cache-control": "no-cache"});
    let options = new RequestOptions();
    options.method= RequestMethod.Post;

    options.headers = myHeaders;
    let body = 'username='+credentials.username+'&password='+credentials.password;

     return this.http.post('/user/login',body,options)
      .map(response => {
      let result = response.json();

      if (result && result.token) {
        localStorage.setItem('token', result.token);

        let jwt = new JwtHelper();
        this.currentUser = jwt.decodeToken(localStorage.getItem('token'));

        return true; 
      }
      
    });
    
    

  }

  logout() { 
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn() {

    let jwt = new JwtHelper();
    let token = localStorage.getItem('token');
    if (!token) return false;
    let expirationDate = jwt.getTokenExpirationDate(token);
    let isExpired = jwt.isTokenExpired(token);
    return !isExpired;
    
  }

}



