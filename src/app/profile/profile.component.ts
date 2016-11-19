import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selectedFileName: string;
  selectedFile: File;
  userName: string = this.authService.name;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  readPicture(input) {    
    if (input.target.files && input.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
          let fileRederResult: FileReader = <FileReader>e.target; 
          console.log(fileRederResult);
          $('#big-profile-picture').attr('src', fileRederResult.result);
          this.selectedFile = input.target.files[0];          
      }
      reader.readAsDataURL(input.target.files[0]);
      
    }
  }

  saveProfile() {    
    if (this.selectedFile) {
      var storageRef = firebase.storage().ref();
      var mountainImagesRef = storageRef.child('images/chain.jpg');
      var uploadTask = storageRef.child('images/' + this.selectedFile.name).put(this.selectedFile);
      uploadTask.on('state_changed', 
      () => {      
      },(error) => {
          console.log(error);
      },() => {      
        this.authService.af.auth.subscribe(user=>{
          user.auth.updateProfile({
            displayName: this.userName || 'Unknown User',
            photoURL: uploadTask.snapshot.downloadURL || this.authService.photoURL
          }).then(()=>{
            this.authService.name = this.userName || 'Unknown User';            
            this.authService.photoURL = uploadTask.snapshot.downloadURL;          
            $('.profile-modal').modal('hide');
          });
        });                        
      });
    } else if(this.userName) {
        this.authService.af.auth.subscribe(user=>{
          user.auth.updateProfile({
            displayName: this.userName,
            photoURL:  this.authService.photoURL
          }).then(()=>{
            this.authService.name = this.userName;                      
            $('.profile-modal').modal('hide');
          });
        });       
    } else {
      // doing nothing
      console.log('no changes');
      $('.profile-modal').modal('hide');
    }
  }

}
