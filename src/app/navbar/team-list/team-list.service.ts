import { Injectable,} from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Team} from '../../models/team';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2'
import {Observable} from 'rxjs/Rx';
import {AuthService} from '../../auth.service';

@Injectable()
export class teamListService {
  
  private selectedTeam = new Subject<Team>();
  public availableTeams: Team[] = [];
  public isTeamSelected: Boolean = false;
  public isTeamSelectedName: string = 'Teams';

  teamsIds: Observable<any[]>;
  xxx = new Subject<Team[]>();

  teams: FirebaseListObservable<any>;
  
  constructor(public af: AngularFire, public as: AuthService) {
    const userTeamIDs = new Subject<string>();
    this.teams = af.database.list('/teams', {
      query : {
        orderByKey: true,
        equalTo: userTeamIDs
      }
    })

    this.teams.subscribe(queriedItems => {
      if (queriedItems.length > 0) {
        console.log('pushing -> ' + queriedItems[0].name)
        this.availableTeams.push(queriedItems[0]);
      }
    });

    this.teamsIds = af.database.list('/users/'+as.uid+'/teams');
    this.teamsIds.subscribe(keys => {
      console.log('processing key');
      keys.map(_key => {
        userTeamIDs.next(_key.$value);
      })
    })

  }
  availableTeams$ =  Observable.of(this.availableTeams);
  selectedTeam$ = this.selectedTeam.asObservable();
  
  
  // Service message commands
  selectTeam(team: Team) {    
    this.isTeamSelectedName = team.name;
    this.selectedTeam.next(team);
    this.isTeamSelected = true;
  }

  getAvailableTeams() {
    return this.availableTeams;
  }
  
  removeTeam(key:string) {
    this.af.database.object('/teams/'+key).remove();
    this.availableTeams = this.availableTeams.filter(t => {
      return t.$key != key;
    })
    this.isTeamSelected = false;
    this.isTeamSelectedName = 'Teams';
  }
  
  addTeam(teamName) {
    const teams = this.af.database.list('teams');    
      teams.push(new Team(teamName ,this.as.uid))
        .then((newTeam) => {
          this.availableTeams$ =  Observable.of(this.availableTeams);
          console.log(newTeam);
          this.addTeamToUser(newTeam.key, this.as.uid);
          this.selectTeam(newTeam);
          this.isTeamSelectedName = teamName;
      });       
  }
  addTeamToUser(teamKey, userId) {
    this.availableTeams = [];
    this.af.database.list('/users/'+userId+'/teams').push(teamKey);
  }


}