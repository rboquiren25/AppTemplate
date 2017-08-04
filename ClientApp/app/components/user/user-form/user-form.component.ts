import { Http, Response } from '@angular/http';
import { HttpService } from './../../../services/http.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormArray, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { ToastyService } from "ng2-toasty";
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})  

export class UserFormComponent {
  
  constructor(private userService: UserService, private toast: ToastyService) {}
  
  roleList : string[] = ['Staff','Administrator']
 
  user = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]+$')],this.shouldBeUnique.bind(this)),
    password: new FormControl('',[Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]+$')]),
    email: new FormControl('',[Validators.required]),
        roles: new FormArray([
            
        ],Validators.required)
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
  

  updateRoles(event:any){
    if(event.target.checked === true){
      this.addRole(event);
    }else{
      this.delRole(event) ;
    }
  }

  addRole(event){
    console.log('add');
    let fg = new FormGroup({});
    fg.addControl('rolename',new FormControl(event.target.name));
    this.roles.push(fg);
  }

  delRole(event){
    console.log('delete');
    for(let i = 0; i < this.roles.length; i++){
     
      if(JSON.stringify(this.roles.at(i).value).indexOf(event.target.name)>0){
          this.roles.removeAt(i);
      }
    }
  }

  get userJson(){
    return JSON.stringify(this.user.value);
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

   OnSubmit(){
      if(this.user.valid)
        {
          this.userService.create(this.user.value).subscribe(newuser => {
          newuser = console.log(newuser)
        });
        }
      else{
          this.toast.error({
            title: 'Blank Form',
            msg: 'Please fill up required fields',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
      }
   }

 

  

}
