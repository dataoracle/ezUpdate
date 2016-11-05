import { Injectable } from '@angular/core';
import { Router }      from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import {AngularFire,FirebaseListObservable} from 'angularfire2';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  uid: string;
  email: string;
  userLabels:FirebaseListObservable<any>;
  
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(public af: AngularFire,public router: Router) {}

  login(user, password) {
    this.af.auth.login({ email: user, password:password })
        .catch((error) => console.log(error));
  }  

  logout() {
    this.af.auth.logout();  
    this.isLoggedIn = false;
    console.log('logging out...');
  }
}