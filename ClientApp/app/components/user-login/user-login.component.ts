import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  invalidLogin: boolean;

  constructor(
    private router: Router,
    private authService: AuthService ) { }

    signIn(credentials) {
      this.authService.login(credentials)
        .subscribe(result => { 
          if (result)
            this.router.navigate(['/']);
          else  
            this.invalidLogin = true; 
           });
    }       
  
}
