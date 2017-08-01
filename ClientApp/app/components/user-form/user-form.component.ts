import { Http, Response } from '@angular/http';
import { HttpService } from './../../services/http.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormArray, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { ToastyService } from "ng2-toasty";
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})  

export class UserFormComponent {
  
  constructor(private userService: UserService, private fb:FormBuilder) {}
  
  roleList : string[] = ['Staff','Administrator']
 
  user = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]+$')],this.shouldBeUnique.bind(this)),
    password: new FormControl('',[Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]+$')]),
    email: new FormControl('',[Validators.required]),
        roles: new FormArray([
      
        ])
  });

  

  get username(){
    
    return this.user.get('username');
  }

  get password(){
    return this.user.get('password');
  }

  get email(){
    return this.user.get('email');
  }

  get roles(){
    return <FormArray>this.user.get('roles');
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

   OnSubmit(user){
      let newuser;
      this.userService.create(user).subscribe(newuser => {
      newuser = newuser;
      console.log(newuser);
    });
   }

 

  

}
