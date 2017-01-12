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
    this.profileService.putUser(this.user)
      .subscribe(
        user => {
          this.user = user;

          // Replace storage with the updated user.
          if (this.isOwner()) {
            // Notice that updating it when the user uri is different (i.e. admin updating an user),
            // would cause their login to be replaced by the user's.
            this.user.authorization = this.authentication.getCurrentUser().authorization;
            this.authentication.storeCurrentUser(this.user);
          }

          this.toggleEdit();
        },
        error => alert('Error: Failed to update user details!'),
      );
  }

  isOwner() {
    return this.authentication.getCurrentUser().uri === this.user.uri;
  }

}
