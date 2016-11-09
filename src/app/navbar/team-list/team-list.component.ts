import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {Team} from '../../models/team'
import {AuthService} from '../../auth.service';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teamIds: Observable<any[]>;  
  teams: FirebaseListObservable<any>;
  userTeams = [];
  constructor(af: AngularFire, as: AuthService) { 

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

}
