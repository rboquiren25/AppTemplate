import { XHRBackend, RequestOptions } from '@angular/http';
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { FormsModule } from '@angular/forms';
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
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'user/login', component: LoginComponent},
            { path: 'users/new', component: UserFormComponent},
            { path: 'users', component: UserListComponent},
            { path: 'home', component: HomeComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        UserService,
        AuthService,
         {
            provide: HttpService,
            useFactory: (backend: XHRBackend, options: RequestOptions) => {
                return new HttpService(backend, options);
            },
            deps: [XHRBackend, RequestOptions]
         }            
    ]
})
export class AppModule {
}
