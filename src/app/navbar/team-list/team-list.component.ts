import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {AngularFire, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {Team} from '../../models/team'
import {AuthService} from '../../auth.service';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';

import {teamListService} from './team-list.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teamIds: Observable<any[]>;  
  teams: FirebaseListObservable<any>;
  userTeams: Observable<Team[]>;
  team = Team;
  
  selectedTeam: Team;
  selectedTeamName:string = 'Teams';
  isTeamSelected:boolean = false;
  isTeamSelectedOwner:boolean = false;

  constructor(private as: AuthService, private tls: teamListService) { 
  }

  ngOnInit() {
  }

  changeTeam(index) {   
      this.selectedTeam = this.tls.availableTeams[index];
      this.tls.selectTeam(this.selectedTeam);
      this.selectedTeamName = this.selectedTeam.name;
      this.isTeamSelected = true;
      this.isTeamSelectedOwner = this.selectedTeam.created_by == this.as.uid;
  }

}
