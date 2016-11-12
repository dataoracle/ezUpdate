import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Team} from '../../models/team';
@Injectable()
export class teamListService {
  // Observable string sources
  private selectedTeam = new Subject<Team>();
  
  // Observable string streams
  selectedTeam$ = this.selectedTeam.asObservable();
  
  // Service message commands
  selectTeam(team: Team) {    
    this.selectedTeam.next(team);
  }
  
}