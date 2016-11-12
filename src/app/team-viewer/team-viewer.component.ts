import { Component, OnInit} from '@angular/core';
import {teamListService} from '../navbar/team-list/team-list.service'
import {Team} from '../models/team'

@Component({
  selector: 'app-team-viewer',
  templateUrl: './team-viewer.component.html',
  styleUrls: ['./team-viewer.component.css']
})
export class TeamViewerComponent implements OnInit {

  teamName:string = 'Please select or join a team!';

  constructor(private tls: teamListService) { 
     tls.selectedTeam$.subscribe(t => {
      this.teamName = t.name;
    });
  }

  ngOnInit() {
  }


}
