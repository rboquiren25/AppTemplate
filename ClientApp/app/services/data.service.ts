import { Error404 } from './../common/app-error404';
import { Error400 } from './../common/app-error400';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from './../components/app/app.component';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpService} from './http.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppError } from "../common/app-error";

@Injectable()
export class DataService {

  constructor(private url: string, private http: HttpService) { }

  getAll()
  {
      return this.http.get(this.url)
        .map(res => res.json())
        .catch(this.handleError);
  }  
  
  create(resource){
    
    return this.http.post(this.url+'/create',resource)
        .map(res => res.json())
        .catch(this.handleError);
  }

  shouldBeUnique(username)
  { 
    return this.http.get(this.url+'/usernamevalidation?username='+username);
  }

  private handleError(error: Response){
      if(error.status === 400)
        return Observable.throw(new Error400(error.json));
      if(error.status === 404)
        return Observable.throw(new Error404());
      
      return Observable.throw(new AppError());
  }
      
}



