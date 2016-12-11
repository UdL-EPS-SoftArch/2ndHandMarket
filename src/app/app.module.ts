import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders }  from './app.routing';
import { NavbarComponent } from './navbar/navbar.component';
import { IntroComponent } from './intro/intro.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { PostAdvertisementComponent } from './advertisement/postAdvertisement.component';
import { GetAdvertisementComponent } from './advertisement/getAdvertisement.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterSellerComponent } from './register-seller/register-seller.component';
import { DateFormatPipe } from 'angular2-moment';
import { SearchAdvertisementComponent } from './search-advertisement/search-advertisement.component';
import { ContactComponent } from './contact/contact.component';
import { PutAdvertisementComponent } from './advertisement/putAdvertisement.component';
import { MessageComponent } from './message/message.component';
import { LoginBasicModule } from './login-basic/login-basic.module';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { AuthenticationBasicService } from './login-basic/authentication-basic.service';
import { OfferComponent } from './offer/offer.component';
import { BuyerComponent } from './buyer/buyer.component';
import { ProfileComponent } from './profile/profile.component';
import { DataTableModule } from 'angular2-datatable';
import { SellerComponent } from './seller/seller.component';
import { ComponentsHelper } from 'ng2-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    LoginBasicModule,
    DataTableModule
  ],
  declarations: [
    AppComponent,
    OfferComponent,
    NavbarComponent,
    IntroComponent,
    MessageComponent,
    IntroComponent,
    AdvertisementComponent,
    PostAdvertisementComponent,
    GetAdvertisementComponent,
    PutAdvertisementComponent,
    FooterComponent,
    RegisterSellerComponent,
    FooterComponent,
    PurchaseComponent,
    SearchAdvertisementComponent,
    ContactComponent,
    DateFormatPipe,
    BuyerComponent,
    ProfileComponent,
    SellerComponent
  ],
  providers: [
    appRoutingProviders, AuthenticationBasicService, LoggedInGuard, ComponentsHelper
  ],
  bootstrap: [AppComponent, NavbarComponent, FooterComponent]
})
export class AppModule { }
