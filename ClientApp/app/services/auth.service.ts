import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class AuthService {
  constructor(private http: Http) { }

  login(credentials)  {
    return this.http.post('/api/Users/Auth',
      JSON.stringify(credentials))
      .map(response => {
        console.log(response.json);
      });
  }

  logout(){

  }

  isLoggedIn(){
    return false;
  }
}