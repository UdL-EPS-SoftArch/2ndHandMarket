import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroComponent } from './intro/intro.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { RegisterSellerComponent } from './register-seller/register-seller.component';
import { PostAdvertisementComponent } from './advertisement/postAdvertisement.component';
import { GetAdvertisementComponent } from './advertisement/getAdvertisement.component';
import { PutAdvertisementComponent } from './advertisement/putAdvertisement.component';
import { SearchAdvertisementComponent } from './search-advertisement/search-advertisement.component';
import { ContactComponent } from './contact/contact.component';
import { MessageComponent } from './message/message.component';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { OfferComponent } from './offer/offer.component';
import { SellerOfferComponent } from './selleroffer/seller-offer.component';
import { BuyerComponent } from './buyer/buyer.component';

const appRoutes: Routes = [
  { path: 'advertisements', component: AdvertisementComponent },
  { path: 'advertisements/new', component: PostAdvertisementComponent, canActivate: [LoggedInGuard] },
  { path: 'advertisements/:id', component: GetAdvertisementComponent },
  { path: 'advertisements/:id/edit', component: PutAdvertisementComponent },
  { path: 'register-sellers', component: RegisterSellerComponent},
  { path: 'searchAdvertisements', component: SearchAdvertisementComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'messages', component: MessageComponent, canActivate: [LoggedInGuard] },
  { path: 'offers', component: OfferComponent },
  { path: 'selleroffers', component: SellerOfferComponent },
  { path: '', component: IntroComponent },
  { path: 'buyers', component: BuyerComponent },
  // { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
