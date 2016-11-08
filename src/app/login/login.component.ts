import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl,FormBuilder} from '@angular/forms'
import {AuthService} from '../auth.service';
import {AngularFire, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2'

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: string;
  password: string;

  loginForm: FormGroup;
  userCtrl = new FormControl(this.user);
  passCtrl = new FormControl(this.password);  

  constructor(fb: FormBuilder, public authService: AuthService, public af:AngularFire) {
    this.loginForm = new FormGroup({
          'user':this.userCtrl,
          'password':this.passCtrl        
        });

        
  }



  ngOnInit() {
    var auth = this.authService.af.auth.subscribe( (user) => {
        if (user) {
            this.authService.uid = user.uid;
            this.authService.isLoggedIn = true;
            this.authService.email = user.auth.email;
            this.initUserPreferences(user.uid);
            this.authService.router.navigate(['/home']);
        } else {
            this.authService.isLoggedIn = false;
        }
    });
  }

  initUserPreferences(userId) {
  }
  

  login() {
    this.authService.login(this.user, this.password);
  }

  logout() {
    this.authService.logout();
  }

}
