import { Component, OnInit } from '@angular/core';
import {AngularFire} from 'angularfire2';
import {AuthService} from '../auth.service';
import {Team} from '../models/team';
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  constructor(public af: AngularFire, public as: AuthService) { }

  ngOnInit() {
  }

  team_name:string; 
  
  addTeam() {
    const teams = this.af.database.list('teams');    
    teams.push(new Team(this.team_name ,this.as.uid))
      .then((newTeam) => this.addTeamToUser(newTeam.key, this.as.uid));       
  }

  addTeamToUser(teamKey, userId) {
    this.af.database.list('/users/'+userId+'/teams').push(teamKey);
  }

}
