import { Component, OnInit } from '@angular/core';
import {Activity} from '../models/activity';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FormGroup, FormBuilder, Validators,FormControl} from '@angular/forms'
import {teamListService} from '../navbar/team-list/team-list.service'
import {UtilsService} from '../utils.service'
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/last';

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

  constructor(fb:FormBuilder, public af:AngularFire, public tls:teamListService, public utils:UtilsService) {
    this.newActivity = fb.group({
      name:['',Validators.required],
      description:[],
      assignedEmail:[null,Validators.required, this.validateUser.bind(this)]
    })
   }

  ngOnInit() {
  }

  addActivity() {
    this.isSaving = true;
    Activity.withImage().then((url) => {
        this.af.database.list('/teams/'+this.tls.isTeamSelectedKey+'/activities')
            .push(new Activity(this.newActivity.controls['name'].value,
                            this.newActivity.controls['description'].value, 
                            this.user.key, url))
            .then((activity) => {
                this.isSaving = false;
                $('.add-activity-modal').modal('hide');
                this.markActivityUnread(activity.key);
            })
    })

  }

  markActivityUnread(key) {
    var fb = firebase.database().ref();
    this.af.database.object('/teams/'+this.tls.isTeamSelectedKey+'/access',{ preserveSnapshot: true })
      .subscribe((teamUsers) => {
        teamUsers.val().forEach((e) => {
          fb.child('/teams/'+this.tls.isTeamSelectedKey+'/activities/'+key+'/read_status/'+e).set({status:"new"})
        })
      })
  }

  resetModal(value: any = undefined) {
      this.newActivity.reset(value);
      this.userIsFound = false;
      this.user = null;
  }

  validateUser(control:FormControl) {
    return new Promise((resolve,reject) => {
      this.utils.asyncUser(control)
        .then((user) => {
          this.user = user;
          this.userIsFound = true;
          resolve(null)
        })
        .catch((error) => {
          this.userIsFound = false;
          resolve(error);
        })
    });
  }
  
}
