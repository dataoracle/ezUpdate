import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {Team} from '../../models/team'
import {AuthService} from '../../auth.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teamIds: Observable<any[]>;
  team: FirebaseObjectObservable<Team>;
  //public teams: Team[];
  teams: Observable<any>;

  constructor(af: AngularFire, as: AuthService) { 
    /*
    let cTeams: Team[];
    af.database.list('/users/'+as.uid+'/teams')
      .map(teamID => {
        console.log(teamID);
        af.database.object('/teams/'+teamID[0].$value).subscribe(team => {this.teams.push(team)});
      });    
      */
    this.teams = af.database.list('/teams').map(_teams => {
      return _teams.map(_team => {
        console.log(_team);
        return _team;
      })
    }) 
  }

  ngOnInit() {
  }

}
