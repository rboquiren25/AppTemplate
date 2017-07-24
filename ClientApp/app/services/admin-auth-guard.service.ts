import { AuthGuard } from './auth-guard.service';
import { platformNodeDynamic } from 'angular2-universal';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AdminAuthGuard extends AuthGuard {

  constructor(authService: AuthService, router: Router) {
    super(authService,router);
   }

  canActivate(){
      var isLoggedIn = super.canActivate();
      if(isLoggedIn){
        return true;
      }
        return false;
    }
      
  

}
