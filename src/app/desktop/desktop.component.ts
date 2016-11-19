import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {teamListService} from '../navbar/team-list/team-list.service';
import {UserLookupService} from '../services/user-lookup.service';

@Component({
  selector: 'app-desktop',
  templateUrl: 'desktop.component.html',
  styleUrls: ['desktop.component.css'],
  providers: [teamListService, UserLookupService]
})
export class DesktopComponent implements OnInit {

  constructor(public as: AuthService, private tls: teamListService) {

  }

  ngOnInit() {
    
  }

}
