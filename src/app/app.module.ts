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
import { MomentModule } from 'angular2-moment';
import { SearchAdvertisementComponent } from './advertisement/search-advertisement/search-advertisement.component';
import { AdvanceSearchAdvertisementComponent } from './advertisement/search-advertisement/advanceSearchAdvertisement.component';
import { ContactComponent } from './contact/contact.component';
import { MessageComponent } from './message/message.component';
import { Auth0Module } from './auth0/auth0.module';
import { LoggedInGuard } from './auth0/loggedin.guard';
import { Auth0Service } from './auth0/auth0.service';
import { BuyerOfferComponent } from './buyeroffer/buyeroffer.component';
import { PersonalOffersListComponent } from './buyeroffer/personalOffersList.component';
import { UpdateOfferComponent} from './buyeroffer/updateOffer.component';
import { BuyerComponent } from './buyer/buyer.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageOffersComponent } from './buyeroffer/manageOffers.component';
import { DataTableModule } from 'angular2-datatable';
import { BasketProductComponent } from './basketProduct/basketProduct.component';
import { SellerComponent } from './seller/seller.component';
import { BasketProductService } from './basketProduct/basketProduct.service';
import { MessageService } from './message/message.service';
import { LoadingModule } from './loading/loading.module';
import { DoesNotExistComponent } from './does-not-exist/doesNotExist.component';
import { WishListComponent } from './buyer/wishlist/wishlist.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Auth0Module,
    DataTableModule,
    LoadingModule,
    MomentModule
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
    AdvanceSearchAdvertisementComponent,
    ContactComponent,
    BuyerComponent,
    BuyerOfferComponent,
    PersonalOffersListComponent,
    ProfileComponent,
    BasketProductComponent,
    ManageOffersComponent,
    ProfileComponent,
    SellerComponent,
    BasketProductComponent,
    UpdateOfferComponent,
    ProfileComponent,
    DoesNotExistComponent,
    WishListComponent,
  ],
  providers: [
    appRoutingProviders, Auth0Service, LoggedInGuard, BasketProductService, MessageService
  ],
  bootstrap: [AppComponent, NavbarComponent, FooterComponent]
})
export class AppModule { }
