import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: number;

  constructor(
    private UserService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ){
      route.params.subscribe(p=>{
          this.id = +p['id'];
      })
   }
  
   user : any;

  ngOnInit() {
    this.UserService.get(this.id).subscribe(user => {
      this.user = user;
      console.log(this.user)
    });
  }

  
}
