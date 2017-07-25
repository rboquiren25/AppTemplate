import { Error400 } from './../../common/app-error400';
import { AppError } from './../../common/app-error';
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
    console.log("sdfsaf");
    this.UserService.getAll().subscribe(users => {
      this.users = users;
    });
  }

}
