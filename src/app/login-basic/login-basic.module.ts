import { NgModule } from '@angular/core';
import { LoginBasicComponent } from './login-basic.component';
import { AuthenticationBasicService } from './authentication-basic.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule, AlertModule } from 'ng2-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ModalModule,
    AlertModule
  ],
  providers: [AuthenticationBasicService],
  declarations: [LoginBasicComponent],
  exports: [LoginBasicComponent]
})
export class LoginBasicModule { }
