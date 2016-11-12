import { Component, OnInit } from '@angular/core';
import {AngularFire} from 'angularfire2';
import {AuthService} from '../auth.service';
import {Team} from '../models/team';
import {teamListService} from '../navbar/team-list/team-list.service';
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  constructor(public af: AngularFire, public as: AuthService, public tls: teamListService) { }

  ngOnInit() {
  }

  team_name:string; 
  
  addTeam() {
   this.tls.addTeam(this.team_name);       
  }



}
