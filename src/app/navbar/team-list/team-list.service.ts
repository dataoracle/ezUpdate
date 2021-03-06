import { Injectable,OnInit} from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Team} from '../../models/team';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2'
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../auth.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/last';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class teamListService {

  public isTeamSelected: Boolean = false;
  public isTeamSelectedName: string = 'Teams';
  public isTeamSelectedKey: string;
  public selectedTeam = new Subject<Team>();
  public userTeams: Observable<any>;
  
  constructor(private af: AngularFire, private as: AuthService) {
    this.userTeams = this.af.database.list('/users/' + this.as.uid + '/teams')
      .map(teams => {
        teams.map(team => {
          team.teamObject = this.af.database.object('/teams/'+team.$value);
        })
        return teams;
      });  
  }

  selectedTeam$ = this.selectedTeam.asObservable();
  
  
  // Service message commands
  selectTeam(team: Team) {    
    this.isTeamSelectedName = team.name;
    this.isTeamSelectedKey = team.$key;
    this.selectedTeam.next(team);
    this.isTeamSelected = true;
  }
  
  removeTeam(key:string) {
    this.isTeamSelected = false;
    this.isTeamSelectedName = 'Teams';
    return this.af.database.object('/teams/'+key).remove();
  }
  
  addTeam(teamName) {
    return new Promise((resolve, reject) => {
      const teams = this.af.database.list('teams');    
        let team = new Team(teamName, this.as.uid);
        teams.push(team)
          .then((newTeam) => {
            team.$key = newTeam.key;
            this.addTeamToUser(newTeam.key, this.as.uid);
            this.selectTeam(team);
            this.isTeamSelectedName = teamName;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });  
    })
     
  }
  addTeamToUser(teamKey, userId) {
    this.af.database.list('/users/'+userId+'/teams').push(teamKey);
  }

  getTeam(teamKey:string) {
     return this.af.database.object('teams/'+teamKey);
  }

}