import { Component, OnInit} from '@angular/core';
import {teamListService} from '../navbar/team-list/team-list.service';
import {Team} from '../models/team';
import {Update} from '../models/update';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Activity} from '../models/activity';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-team-viewer',
  templateUrl: './team-viewer.component.html',
  styleUrls: ['./team-viewer.component.css']
})
export class TeamViewerComponent implements OnInit {

  teamName:string = 'Please select or join a team!';
  activities: FirebaseListObservable<Activity[]>
  team: Team;
  isTeamSelected: boolean = false;
  hasActivities: boolean;
  updateText: string;
  selectedActivity: string;
  isSaving:boolean = false;

  constructor(private tls: teamListService, public af:AngularFire, public as:AuthService) { 
      this.teamName = tls.isTeamSelectedName;
  }

  ngOnInit() {
    this.tls.selectedTeam$.subscribe((team) => {     
     this.isTeamSelected = true;
     this.team = team;
     this.activities = this.af.database.list('/teams/'+this.team.$key+'/activities');
     this.activities.subscribe((activity) => {       
       this.hasActivities = activity.length > 0;        
     })
    })
  }

  openModalUpdate(activityKey) {
    this.selectedActivity = activityKey;
    $('.add-update-modal').modal('show');

  }
  addUpdate(activityKey) {
    this.isSaving = true;
    this.af.database.list('/teams/'+this.team.$key+'/activities/'+activityKey+'/updates')
      .push(new Update(this.as.uid,this.updateText))
      .then(() => {
        this.isSaving = false;
        this.updateText = '';
        $('.add-update-modal').modal('hide');
      })
  }

}
