import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {AngularFire, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import {Team} from '../../models/team'
import {AuthService} from '../../auth.service';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {FormGroup, FormBuilder, Validators,FormControl} from '@angular/forms'

import {teamListService} from './team-list.service';
import {UtilsService} from '../../utils.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teamIds: Observable<any[]>;  
  teams: FirebaseListObservable<any>;
  //userTeams: Observable<any[]>;
  team = Team;
  availableTeams: string[] = [];
  selectedTeam: Team;
  selectedTeamName:string = 'Teams';
  isTeamSelected:boolean = false;
  isTeamSelectedOwner:boolean = false;

  newUser: FormGroup;
  user:any;
  userIsFound:boolean = false;
  isSaving:boolean = false;
  

  constructor(private as: AuthService, private tls: teamListService,fb:FormBuilder, public utils:UtilsService, private af:AngularFire) { 
    this.newUser = fb.group({
      assignedEmail:[null,Validators.required, this.validateUser.bind(this)]
    })
  }

  ngOnInit() {
      
    if (this.as.userObject.hasOwnProperty('defaultTeam') && this.as.userObject.defaultTeam) {
      this.changeToDefault(this.as.userObject.defaultTeam);
    }

  }

  changeToDefault(teamKey:string) {
    this.tls.getTeam(teamKey)
      .subscribe((team) => {
        this.selectedTeam = team;
        this.tls.selectTeam(team);
        this.isTeamSelected = true;
        this.isTeamSelectedOwner = this.selectedTeam.created_by == this.as.uid;
      });
  }

  changeTeam(team:Observable<Team>) {   
      team.take(1).subscribe(team => {
        this.selectedTeam = team;
        this.tls.selectTeam(this.selectedTeam);
        this.selectedTeamName = this.selectedTeam.name;
        this.isTeamSelected = true;
        this.isTeamSelectedOwner = this.selectedTeam.created_by == this.as.uid;
      });
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

  inviteUser() {
    this.isSaving = true;
    this.utils.addTeamToUser(this.user.key, this.selectedTeam.$key)
      .then(() => {
        this.isSaving = false;
        this.newUser.reset()
        $('.invite-user-modal').modal('hide');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  setDefault() {
    this.utils.setUsersDefaultTeam(this.as.uid, this.selectedTeam.$key)
      .then(() => {
        console.log('success');
      })
      .catch((error) => {
        console.log(error);
      })
  }


}
