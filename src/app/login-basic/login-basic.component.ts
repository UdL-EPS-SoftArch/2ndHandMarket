import {
  Component, OnInit, ViewChild, Input
} from '@angular/core';
import { AuthenticationBasicService } from './authentication-basic.service';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: '[login-basic]',
  templateUrl: './login-basic.component.html',
  styleUrls: ['./login-basic.component.scss'],
  providers: [AuthenticationBasicService]
})
export class LoginBasicComponent implements OnInit {

  @Input('appRouter') appRouter;
  @ViewChild('loginModal') public loginModal: ModalDirective;
  errorMessage: string = '';

  constructor(private authenticationService: AuthenticationBasicService) { }

  ngOnInit() { }

  showLoginModal(): void {
    this.loginModal.show();
  }

  hideLoginModal(userInput: HTMLInputElement, passwordInput: HTMLInputElement): void {
    this.loginModal.hide();
    this.errorMessage = '';
    userInput.value = '';
    passwordInput.value = '';
  }

  login(userInput: HTMLInputElement, passwordInput: HTMLInputElement): boolean {
    this.authenticationService.login(userInput.value, passwordInput.value)
      .subscribe(
        user => {
          this.authenticationService.storeCurrentUser(user);
          this.hideLoginModal(userInput, passwordInput);
        },
        error =>  this.errorMessage = <any>error.message);
    return false;
  }

  logout(): boolean {
    this.authenticationService.logout();
    return false;
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().username;
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
