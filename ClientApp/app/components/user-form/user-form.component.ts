import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ToastyService } from "ng2-toasty";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})  
export class UserFormComponent {

  constructor(
    private toastyService: ToastyService
  ) { }

  submit(user) {
    console.log(user);
    this.toastyService.error({
      title: 'Error',
      msg: 'errordsfsfd',
      theme: 'bootstrap',
      timeout: 5000,
      showClose: true
    })
  }

}
