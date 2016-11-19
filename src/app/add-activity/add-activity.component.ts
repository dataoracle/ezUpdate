import { Component, OnInit } from '@angular/core';
import {Activity} from '../models/activity';
import {FirebaseListObservable} from 'angularfire2';
import {FormGroup, FormBuilder, Validators,FormControl} from '@angular/forms'

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

  newActivity: FormGroup;

  user: any;
  userIsFound: boolean;

  constructor(fb:FormBuilder) {
    this.newActivity = fb.group({
      name:['',Validators.required],
      description:[],
      assignedEmail:[null,Validators.required, this.asyncUser.bind(this)]
    })
   }

  ngOnInit() {
  }

  addActivity() {
    // fetch the user firebase ID from user email
    // this.userLkp = this.uls.userIDbyEmail(this.assigned_user_email);
    // this.userLkp.subscribe(user => {      
    //   console.log(user);
    //   console.log(new Activity(this.name, this.description, user.key));
    // })
    console.log(this.newActivity);
    
  }

  userFound(user) {
    console.log(user);
  }

  asyncUser(control: FormControl) {
        var debounceTimeout;
        clearTimeout(debounceTimeout);

        var fb = firebase.database().ref();
        return new Promise((resolve, reject) => {
            debounceTimeout = setTimeout(() => {
                fb.child('users').orderByChild('emailAddress').equalTo(control.value).once('value', (snap) => {
                    if (snap.val()) {
                        this.user = snap.val()[Object.keys(snap.val())[0]];
                        this.user.key = Object.keys(snap.val())[0];
                        this.userIsFound = true;
                        resolve(null)
                    } else {
                        this.userIsFound = false;
                        this.user = null;
                        resolve({useNotFound:true})
                    }
                }); 
            },1000);
        });
    }

}
