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
import { SearchAdvertisementComponent } from './advertisement/search-advertisement/search-advertisement.component';
import { ContactComponent } from './contact/contact.component';
import { MessageComponent } from './message/message.component';
import { LoginBasicModule } from './login-basic/login-basic.module';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { AuthenticationBasicService } from './login-basic/authentication-basic.service';
import { BuyerOfferComponent } from './buyeroffer/buyeroffer.component';
import { PersonalOffersListComponent } from './buyeroffer/personalOffersList.component';
import { BuyerComponent } from './buyer/buyer.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageOffersComponent } from './buyeroffer/manageOffers.component';
import { DataTableModule } from 'angular2-datatable';
import { ComponentsHelper } from 'ng2-bootstrap';
import { BasketProductComponent } from './basketProduct/basketProduct.component';
import { SellerComponent } from './seller/seller.component';
import { BasketProductService } from './basketProduct/basketProduct.service';
import { MessageService } from './message/message.service';

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
    NavbarComponent,
    IntroComponent,
    MessageComponent,
    IntroComponent,
    AdvertisementComponent,
    PostAdvertisementComponent,
    GetAdvertisementComponent,
    FooterComponent,
    RegisterSellerComponent,
    FooterComponent,
    PurchaseComponent,
    SearchAdvertisementComponent,
    ContactComponent,
    DateFormatPipe,
    BuyerComponent,
    BuyerOfferComponent,
    PersonalOffersListComponent,
    ProfileComponent,
    BasketProductComponent,
    ManageOffersComponent,
    ProfileComponent,
    SellerComponent,
    BasketProductComponent
  ],
  providers: [
    appRoutingProviders, AuthenticationBasicService, LoggedInGuard, ComponentsHelper, BasketProductService, MessageService
  ],
  bootstrap: [AppComponent, NavbarComponent, FooterComponent]
})
export class AppModule { }
