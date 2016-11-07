import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {Team} from '../../models/team'
import {AuthService} from '../../auth.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams: Observable<Team[]>;

  constructor(af: AngularFire, as: AuthService) { 
    this.teams = af.database.list('/teams')
      .filter(teams => {
        console.log(teams);
        for (var i=0;i<teams[0].access.length;i++) {
          if (teams[0].access[i] == as.uid) {
            console.log('found');
            return true;
          }
        }
      });  
  }

  ngOnInit() {
  }

}
