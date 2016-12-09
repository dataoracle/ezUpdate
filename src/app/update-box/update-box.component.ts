import { Component, OnInit,Input } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2'

@Component({
  selector: 'app-update-box',
  templateUrl: './update-box.component.html',
  styleUrls: ['./update-box.component.css']
})
export class UpdateBoxComponent implements OnInit {
  
  
  @Input() activity:string;
  teamKey:string;
  activityKey:string;
  lastUpdate: string;

  updates: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire) { 
  }

  ngOnInit() {
    this.teamKey = this.activity.split('|')[0];
    this.activityKey = this.activity.split('|')[1];

    this.updates = this.af.database.list('/teams/'+this.teamKey+'/activities/'+this.activityKey+'/updates',
    {query: {
      orderByKey:true,
      limitToLast:1
    }})

    this.updates.subscribe((update) => {
      if (update.length > 0) {
        this.lastUpdate = update[0].$value;
      } else {
        this.lastUpdate = "No updates yet! :\\";
      }
    })    
  }

}
