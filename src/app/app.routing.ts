import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasketProductComponent } from './basketProduct/basketProduct.component';
import { IntroComponent } from './intro/intro.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { RegisterSellerComponent } from './register-seller/register-seller.component';
import { PostAdvertisementComponent } from './advertisement/postAdvertisement.component';
import { GetAdvertisementComponent } from './advertisement/getAdvertisement.component';
import { SearchAdvertisementComponent } from './advertisement/search-advertisement/search-advertisement.component';
import { ContactComponent } from './contact/contact.component';
import { MessageComponent } from './message/message.component';
import { LoggedInGuard } from './auth0/loggedin.guard';
import { BuyerOfferComponent } from './buyeroffer/buyeroffer.component';
import { PersonalOffersListComponent } from './buyeroffer/personalOffersList.component';
import { BuyerComponent } from './buyer/buyer.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ManageOffersComponent } from './buyeroffer/manageOffers.component';

const appRoutes: Routes = [
  { path: 'advertisements', component: AdvertisementComponent },
  { path: 'advertisements/new',
    component: PostAdvertisementComponent,
    canActivate: [LoggedInGuard]
  },
  { path: 'advertisements/:id', component: GetAdvertisementComponent },
  { path: 'advertisements/:id/edit', component: PostAdvertisementComponent },
  {
    path: 'advertisements/:ids/purchase',
    component: PurchaseComponent,
    canActivate: [LoggedInGuard]
  },
  { path: 'about', component: IntroComponent },
  { path: 'register-sellers', component: RegisterSellerComponent},
  { path: 'cart', component: BasketProductComponent},
  { path: 'searchAdvertisements', component: SearchAdvertisementComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'messages', component: MessageComponent, canActivate: [LoggedInGuard] },
  { path: 'buyeroffers', component: BuyerOfferComponent },
  { path: 'personalOffersList', component: PersonalOffersListComponent },
  { path: '', component: AdvertisementComponent },
  { path: 'buyers', component: BuyerComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'profile/manageoffers', component: ManageOffersComponent, canActivate: [LoggedInGuard] }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
