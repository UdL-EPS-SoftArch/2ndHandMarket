import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PictureComponent } from './picture/picture.component';
import { IntroComponent } from "./intro/intro.component";
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { SellerOfferComponent } from './selleroffer/seller-offer.component';

const appRoutes: Routes = [
  { path: 'advertisements', component: AdvertisementComponent },
  { path: 'pictures', component: PictureComponent },
  { path: 'selleroffers', component: SellerOfferComponent },
  //  { path: 'pictures/:id', component: PictureDetailComponent },
  { path: '', component: IntroComponent },
  //  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
