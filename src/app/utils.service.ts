import { Injectable } from '@angular/core';
import {FormControl} from '@angular/forms'

@Injectable()
export class UtilsService {

  constructor() { }
  public user:any;
  public userIsFound:boolean = false;

  asyncUser(control: FormControl) {
      var debounceTimeout;
      clearTimeout(debounceTimeout);

      var fb = firebase.database().ref();
      return new Promise((resolve, reject) => {
          debounceTimeout = setTimeout(() => {
              fb.child('users').orderByChild('emailAddress').equalTo(control.value).once('value', (snap) => {
                  if (snap.val()) {
                      this.user = snap.val()[Object.keys(snap.val())[0]];
                      this.user.key = Object.keys(snap.val())[0];
                      this.userIsFound = true;
                      resolve(this.user)
                  } else {
                      reject({useNotFound:true})
                  }
              }); 
          },1000);
      });
  }

  addTeamToUser(userKey:string, teamKey:string) {
    var fb = firebase.database().ref();
    return new Promise((resolve,reject) => {
      fb.child('users/'+userKey+'/teams').push(teamKey)
        .then(() => {
          resolve(null);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  setUsersDefaultTeam(userKey:string, teamKey:string) {
      var fb = firebase.database().ref();
      return new Promise((resolve,reject) => {
          fb.child('users/'+userKey+'/defaultTeam').set(teamKey)
            .then(() => {
                resolve(null);
            })
            .catch((error) => {
                reject(error);
            })
      })
  }

}
