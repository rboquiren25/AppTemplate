import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class UserService extends DataService {

  constructor(http: HttpService) {
    super('/api/Users',http);
   }
      
}



