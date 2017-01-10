import { Component, OnInit } from '@angular/core';
import {teamListService} from '../navbar/team-list/team-list.service'
import {Team} from '../models/team';

@Component({
  selector: 'app-delete-team',
  templateUrl: './delete-team.component.html',
  styleUrls: ['./delete-team.component.css']
})
export class DeleteTeamComponent implements OnInit {

teamToDelete: Team;
isSaving:boolean = false;
isError:boolean = false;
errorMessage:string = '';

  constructor(public tls: teamListService ) { 
    tls.selectedTeam$.subscribe(t => {
      this.teamToDelete = t;
    });
  }

  ngOnInit() {    
  }
  
  deleteTeam() {
    this.isSaving = true;
    this.tls.removeTeam(this.teamToDelete.$key)
      .then(() => {
        this.isSaving = false;
        $('.delete-team-modal').modal('hide');
      })
      .catch((error) => {
        this.isError = true;
        this.errorMessage = error.message;
      })
      
  }



}
