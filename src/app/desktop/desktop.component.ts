import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-desktop',
  templateUrl: 'desktop.component.html',
  styleUrls: ['desktop.component.css']
})
export class DesktopComponent implements OnInit {
    
  constructor(public as: AuthService) {}

  ngOnInit() {
    
  }

}
