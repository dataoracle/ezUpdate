import { Component, OnInit } from '@angular/core';
import {teamListService} from '../navbar/team-list/team-list.service'
import {AngularFire} from 'angularfire2';
import {Team} from '../models/team';

@Component({
  selector: 'app-delete-team',
  templateUrl: './delete-team.component.html',
  styleUrls: ['./delete-team.component.css']
})
export class DeleteTeamComponent implements OnInit {

teamToDelete: Team;

  constructor(public tls: teamListService, public af: AngularFire ) { 
    tls.selectedTeam$.subscribe(t => {
      this.teamToDelete = t;
    });
  }

  ngOnInit() {    
  }
  
  deleteTeam() {
    this.af.database.object('/teams/'+this.teamToDelete.$key).remove();
    window.location.reload();

  }



}
