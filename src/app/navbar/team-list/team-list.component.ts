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
  userTeams: Team[] = [];
  team = Team;
  
  selectedTeam:string = 'Teams';
  isTeamSelected:boolean = false;
  isTeamSelectedOwner:boolean = false;


  //@Output() onSelect = new EventEmitter<string>();



  constructor(af: AngularFire, public as: AuthService, private tls: teamListService) { 

    const subject = new Subject(); 
    this.teams = af.database.list('/teams', {
      query: {
        orderByKey: true,
        equalTo: subject 
      }
    })
    this.teams.subscribe(queriedItems => {        
        if (queriedItems.length > 0) {
          this.userTeams.push(queriedItems[0]);
        }                
    });
    this.teamIds = af.database.list('users/'+as.uid+'/teams')
    this.teamIds.subscribe(key => {
      this.userTeams = [];
      key.map(_key => {               
        subject.next(_key.$value);
      })      
    })    
  }

  ngOnInit() {
  }

  changeTeam(index) {    
    this.tls.selectTeam(this.userTeams[index]);
    this.selectedTeam = this.userTeams[index].name;
    this.isTeamSelected = true;
    this.isTeamSelectedOwner = this.userTeams[index].created_by == this.as.uid; 
  }

}
