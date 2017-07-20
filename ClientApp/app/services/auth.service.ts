import { HomeComponent } from './../components/home/home.component';
import { AppComponent } from './../components/app/app.component';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, Headers, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) { 
    
  let myHeaders = new Headers({'Content-Type':'application/x-www-form-urlencoded','Accept':'application/x-www-form-urlencoded',"cache-control": "no-cache"});
  

  let options = new RequestOptions();
  options.method= RequestMethod.Post;

  options.headers = myHeaders;
  

  var x = ' {"username": "rboquiren25", "password": "rboquiren25" }';


    return this.http.post('/user/login','username=rboquiren25&password=rboquiren25',options)
    .map(  res => res.json);
    
    

  }



  
  logout() { 
  }

  isLoggedIn() { 
    return false;
  }
}



