import { FormArray, Validators } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { NavMenuComponent } from './../../navmenu/navmenu.component';
import { user, role } from './../../../models/user';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  
  roleList : string[] = ['Staff','Administrator']
  id: number;
  user: user = {
    id: 0,
    username:'',
    password:'',
    email:'',
    roles:[]
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastyService
  ){
      route.params.subscribe(p=>{
          this.id = +p['id'];
      })
   }
  
  
   
  ngOnInit() {
    this.userService.get(this.id).subscribe(user => {
     this.user = user;
  
    });
    
  }

  isRole(ir : string){
    let res: boolean = false;
    for(let i = 0; i < this.user.roles.length; i++){
      if(JSON.stringify(this.user.roles[i]).indexOf(ir) > 0){
        res = true;
      }
    }
      return res;
  }

  updateRoles(event:any){
    if(event.target.checked === true){
      this.addRole(event);
    }else{
      this.delRole(event) ;
    }
  }

  addRole(event){
    console.log('add' + event.target.name);
    let newRole : role = ({
      id: 0,
      rolename: event.target.name
    });
    
    this.user.roles.push(newRole)
  }

  delRole(event){
    console.log('delete' + event.target.name);
      for(let i = 0; i < this.user.roles.length; i++){
        if(JSON.stringify(this.user.roles[i]).indexOf(event.target.name)>0){ 
            this.user.roles.splice(i,1);
        }
    }
  }

   get userJson(){
    return JSON.stringify(this.user);
  }

     OnSubmit(){
      if(this.user.roles.length > 0)
        {
          this.userService.update(this.user).subscribe(newuser => {
          if(newuser){
              this.toast.success({
              title: 'Update Success!',
              msg: this.user.username +"'s role(s) updated..",
              theme: 'bootstrap',
              showClose: true,
              timeout: 5000
          });
          }
        });
        }
      else{
          this.toast.error({
            title: 'Update Error',
            msg: 'Please select role(s)...',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
      }
   }
 
}
