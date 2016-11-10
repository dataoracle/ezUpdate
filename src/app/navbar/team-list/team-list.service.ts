import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class teamListService {
  // Observable string sources
  private selectedTeam = new Subject<string>();
  
  // Observable string streams
  selectedTeam$ = this.selectedTeam.asObservable();
  
  // Service message commands
  selectTeam(team: string) {    
    this.selectedTeam.next(team);
  }
  
}