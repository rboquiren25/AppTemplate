import { DataService } from './services/data.service';
import { ErrorHandler } from '@angular/core';
import { AppErrorHandler } from './common/app-error-handler';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { XHRBackend, RequestOptions } from '@angular/http';
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ToastyModule} from 'ng2-toasty';
import { UniversalModule } from 'angular2-universal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginComponent } from './components/login/login.component';  



@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        UserFormComponent,
        UserListComponent,
        LoginComponent,
        
    ],
    imports: [
        UniversalModule,
        FormsModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        ReactiveFormsModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'user/login', component: LoginComponent},
            { path: 'users/new', component: UserFormComponent},
            { path: 'users', component: UserListComponent,  canActivate: [AdminAuthGuard]},
            { path: 'home', component: HomeComponent }
        ])
    ],
    providers: [
        HttpService,
        UserService,
        DataService,
        AuthService,
        AuthGuard,
        AdminAuthGuard,
        {provide: ErrorHandler, useClass: AppErrorHandler}
    ]
})
export class AppModule {
}
