import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  photoURL:string;
  name:string='';  

  constructor(public authService: AuthService) { }

  ngOnInit() {
      this.authService.af.database.object('/users/' + this.authService.uid)
        .subscribe((u) => {
          this.photoURL = u.photoURL;
          this.name = u.displayName;        
    });
  }

  logout() {    
    window.location.href = '/login';  
    this.authService.af.auth.unsubscribe();
    this.authService.logout();    
  }
}
