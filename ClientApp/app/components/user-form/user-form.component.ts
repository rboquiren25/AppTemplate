import { Http } from '@angular/http';
import { HttpService } from './../../services/http.service';
import { Observable } from 'rxjs/Observable';
import { UserNameValidators } from './username.validators';
import { AuthService } from './../../services/auth.service';
import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from "@angular/router";
import { ToastyService } from "ng2-toasty";
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})  

export class UserFormComponent {
  
  constructor(private userService: UserService) {}

  form = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]+$')],this.shouldBeUnique.bind(this)),
    password: new FormControl(),
    password2: new FormControl(),
    email: new FormControl()
  })


  get username(){
    return this.form.get('username');
  }
  
   shouldBeUnique(control: AbstractControl){
        return new Promise((resolve, reject) => {
            this.userService.shouldBeUnique(control.value)
           .subscribe(result => { 
            if (result.status === 200){
                resolve({shouldBeUnique:true});
            }
            else{
                resolve (null);
            }
          });
        });
   }
  

}
