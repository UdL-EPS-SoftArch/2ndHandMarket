import { Component, OnInit } from '@angular/core';
import { User } from '../login-basic/user';
import { AuthenticationBasicService } from "../login-basic/authentication-basic.service";
import { ProfileService } from "./profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService, AuthenticationBasicService],
})
export class ProfileComponent implements OnInit {
  isEditing: boolean = false;

  user: User = new User();
  newPassword: string; // TODO. Might be moved to the User class.

  constructor(private profileService: ProfileService,
               private authenticationBasicService: AuthenticationBasicService) {
  }

  ngOnInit() {
    const loggedInAs = this.authenticationBasicService.getCurrentUser().username;

    // Retrieve the current logged in user information.
    this.profileService.getUser(loggedInAs)
      .subscribe(
        user => this.user = user,
        error => alert('Error: Failed to retrieve user details!'),
      );
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  submitEdit() {
    // TODO. Handle new password.
    this.profileService.putUser(this.user)
      .subscribe(
        user => {
          this.user = user;

          // All went alright. Clear password, and turn back to the read-only mode.
          this.newPassword = '';
          this.toggleEdit();
        },
        error => alert('Error: Failed to update user details!'),
      );
  }

}
