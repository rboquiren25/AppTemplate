import { platformNodeDynamic } from 'angular2-universal';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    protected authService: AuthService,
    private router: Router
  ) { }

  canActivate(){
    if(this.authService.isLoggedIn()){
        return true;
    }
      this.router.navigate(['/user/login']);
  }

  

}
