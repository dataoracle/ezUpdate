import { Component, OnInit } from '@angular/core';
import {Activity} from '../models/activity';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FormGroup, FormBuilder, Validators,FormControl} from '@angular/forms'
import {teamListService} from '../navbar/team-list/team-list.service'


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
  isSaving: boolean = false;
  newActivity: FormGroup;

  user: any;
  userIsFound: boolean;

  constructor(fb:FormBuilder, public af:AngularFire, public tls:teamListService) {
    this.newActivity = fb.group({
      name:['',Validators.required],
      description:[],
      assignedEmail:[null,Validators.required, this.asyncUser.bind(this)]
    })
   }

  ngOnInit() {
  }

  addActivity() {
    this.isSaving = true;
    this.af.database.list('/teams/'+this.tls.isTeamSelectedKey+'/activities')
        .push(new Activity(this.newActivity.controls['name'].value,
                           this.newActivity.controls['description'].value, 
                           this.user.key))
        .then(() => {
            this.isSaving = false;
            $('.add-activity-modal').modal('hide');
        })
  }

  resetModal(value: any = undefined) {
      this.newActivity.reset(value);
      this.userIsFound = false;
      this.user = null;
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
