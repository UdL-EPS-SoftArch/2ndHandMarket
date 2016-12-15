import { Component, OnInit } from '@angular/core';
import { User } from '../login-basic/user';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService, AuthenticationBasicService],
})
export class ProfileComponent implements OnInit {
  isEditing: boolean = false;

  user: User = new User();
  newPassword: string = '';
  newPasswordRepeat: string = '';

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
    // Verify that both new password and its repeated match.
    // Note: even when not changing the password, they still have to match to an
    // empty string.
    if (this.newPassword !== this.newPasswordRepeat) {
      alert('New passwords do not match');
      return;
    }
    // API requires us a password. Take the newest password, that is the form
    // one only if its not blank.
    const newPassword = this.newPassword
      ? this.newPassword
      : this.authenticationBasicService.getCurrentUser().password;
    this.user.password = newPassword;

    this.profileService.putUser(this.user)
      .subscribe(
        user => {
          this.user = user;

          // All went alright. Clear password, and turn back to the read-only mode.
          // Other fields don't have to be cleaned-up, they are meant to feed
          // the read status as well.
          this.newPassword = this.newPasswordRepeat = '';
          // Also, update the new user into the storage, so that the user
          // doesn't have to log back in again.
          this.user.authorization = this.authenticationBasicService
            .generateAuthorization(this.user.username, newPassword);
          this.user.password = newPassword;
          this.authenticationBasicService.storeCurrentUser(this.user);

          this.toggleEdit();
        },
        error => alert('Error: Failed to update user details!'),
      );
  }

}
