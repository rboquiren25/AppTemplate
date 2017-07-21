import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
   
   constructor(private authService: AuthService){}

}
