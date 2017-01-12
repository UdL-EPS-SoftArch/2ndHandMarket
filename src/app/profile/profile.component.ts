import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../auth0/user';
import { Auth0Service } from '../auth0/auth0.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService, Auth0Service],
})
export class ProfileComponent implements OnInit {
  isEditing: boolean = false;

  user: User = new User();
  newPassword: string = '';
  newPasswordRepeat: string = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private profileService: ProfileService,
              private authentication: Auth0Service) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/users/${id}`;
        this.getUser(uri);
      });
  }

  getUser(uri) {
    this.profileService.getUser(uri)
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
      : this.authentication.getCurrentUser().password;
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
          this.user.authorization = this.authentication.getCurrentUser().authorization;
          this.authentication.storeCurrentUser(this.user);

          this.toggleEdit();
        },
        error => alert('Error: Failed to update user details!'),
      );
  }

}
