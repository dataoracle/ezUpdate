import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {teamListService} from '../navbar/team-list/team-list.service'

@Component({
  selector: 'app-desktop',
  templateUrl: 'desktop.component.html',
  styleUrls: ['desktop.component.css'],
  providers: [teamListService]
})
export class DesktopComponent implements OnInit {

  constructor(public as: AuthService, private tls: teamListService) {

  }

  ngOnInit() {
    
  }

}
