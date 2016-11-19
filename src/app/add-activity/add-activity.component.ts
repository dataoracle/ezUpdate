import { Component, OnInit } from '@angular/core';
import {Activity} from '../models/activity';
import {UserLookupService} from '../services/user-lookup.service';
import {FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {
  
  name: string;
  description:string;
  assigned_to: string;
  assigned_user_email:string;
  userLkp: FirebaseListObservable<any>;
  constructor(public uls: UserLookupService) { }

  ngOnInit() {
  }

  addActivity() {
    // fetch the user firebase ID from user email
    this.userLkp = this.uls.userIDbyEmail(this.assigned_user_email);
    this.userLkp.subscribe(user => {      
      console.log(user);
      console.log(new Activity(this.name, this.description, user.key));
    })
    
  }

}
