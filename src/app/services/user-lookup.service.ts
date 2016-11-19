import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2'

@Injectable()
export class UserLookupService {

  constructor(private af:AngularFire) { }

  userIDbyEmail(email:string) {
    return this.af.database.list('/users',
    {
      query:{
        orderByChild:'email',
        equalTo:email
      }
    })    
  }

}
