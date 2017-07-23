import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users;

  constructor(private UserService: UserService) { }

  ngOnInit() {
    this.UserService.getUsers().subscribe(users => {
      
      
      this.users = users;
      console.log("Users", this.users);
      console.log(users.status);
    });
  }

}
