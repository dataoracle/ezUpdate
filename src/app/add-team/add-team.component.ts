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

  isSaving:boolean = false;
  team_name:string; 

  constructor(public af: AngularFire, public as: AuthService, public tls: teamListService) { }

  ngOnInit() {
  }
  
  addTeam() {
   this.isSaving = true;
   this.tls.addTeam(this.team_name)
    .then(() => {
      this.isSaving = false;
      $('.add-team-modal').modal('hide');
      this.team_name = null;
    })       
  }



}
