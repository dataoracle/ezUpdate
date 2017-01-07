import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  logout() {    
    window.location.href = '/login';  
    this.authService.af.auth.unsubscribe();
    this.authService.logout();    
  }
}
