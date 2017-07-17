import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
  currentUser: any;

  constructor(private http: Http) {
    let token = localStorage.getItem('token');
    if(token){
        let jwt = new JwtHelper();
        this.currentUser = jwt.decodeToken(token);
    }
   }

}
