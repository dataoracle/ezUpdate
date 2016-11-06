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

  addTeam() {
    const teams = this.af.database.list('teams');    
    teams.push(new Team('NewTeam',this.as.uid));       
  }

}
