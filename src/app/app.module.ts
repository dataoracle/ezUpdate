import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {firebaseConfig} from '../config/firebaseConfig';

/* Firebase */
import {AngularFireModule, AuthMethods, AuthProviders} from 'angularfire2';


/* app components */
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {DesktopComponent} from './desktop/desktop.component';

/* app routes */
import {appRouting, appRoutingProviders} from './app.routes';
import { NavbarComponent } from './navbar/navbar.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { TeamListComponent } from './navbar/team-list/team-list.component';


const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
  remember: 'sessionOnly'
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,    
    DesktopComponent, NavbarComponent, AddTeamComponent, TeamListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    appRouting,
    AngularFireModule.initializeApp(firebaseConfig,myFirebaseAuthConfig)
  ],
  providers: [FormBuilder, appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
