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
            this.authService.name = user.auth.displayName;
            this.authService.photoURL = user.auth.photoURL;
            this.initUserPreferences(user.auth);                        
            this.authService.router.navigate(['/home']);            
        } else {
            this.authService.isLoggedIn = false;
        }
    });
  }

  initUserPreferences(user:firebase.User) {
    if (!this.authService.photoURL) {
      var photoRef = 'images/default.jpg';
      this.authService.name = user.displayName || user.email;
      var storage = firebase.storage();
      var storageRef = storage.ref();
      storageRef.child(photoRef).getDownloadURL().then(url => {
        this.authService.photoURL = url;
        user.updateProfile({
        displayName:'Unknown User',
        photoURL: this.authService.photoURL
      })
      }).catch(function(error) {
        console.log(error);
      });     
    }     
  }
  

  login() {
    this.authService.login(this.user, this.password);
  }

  logout() {
    this.authService.logout();
  }

}
