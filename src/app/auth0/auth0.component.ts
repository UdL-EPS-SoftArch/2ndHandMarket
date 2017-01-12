import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Auth0Service } from './auth0.service';

@Component({
  selector: 'app-auth0',
  templateUrl: './auth0.component.html',
  styleUrls: ['./auth0.component.scss'],
  providers: [Auth0Service]
})
export class Auth0Component implements OnInit {

  @Input('appRouter') appRouter;
  @ViewChild('username') username;
  errorMessage: string = '';

  constructor(public auth0Service: Auth0Service) { }

  ngOnInit() { }

  redirectToProfile() {
    this.appRouter.navigate([`/profile/${this.auth0Service.getCurrentUser().username}`]);
  }
}
