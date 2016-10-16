import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PictureComponent } from './picture/picture.component';
import { IntroComponent } from "./intro/intro.component";
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { RegisterSellerComponent } from './register-seller/register-seller.component'

const appRoutes: Routes = [
  { path: 'advertisements', component: AdvertisementComponent },
  { path: 'pictures', component: PictureComponent },
  { path: 'register-sellers', component: RegisterSellerComponent},
  //  { path: 'pictures/:id', component: PictureDetailComponent },
  { path: '', component: IntroComponent },
  //  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
