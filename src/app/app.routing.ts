import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PictureComponent } from './picture/picture.component';
import { IntroComponent } from './intro/intro.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { PostAdvertisementComponent } from './advertisement/postAdvertisement.component';
import { SearchAdvertisementComponent } from './search-advertisement/search-advertisement.component';
import { ContactComponent } from './contact/contact.component';
import { GetAdvertisementComponent } from './advertisement/getAdvertisement.component';

const appRoutes: Routes = [
  { path: 'advertisements', component: AdvertisementComponent },
  { path: 'advertisements/new', component: PostAdvertisementComponent },
  { path: 'advertisements/:id', component: GetAdvertisementComponent },
  { path: 'pictures', component: PictureComponent },
  { path: 'searchAdvertisements', component: SearchAdvertisementComponent},
  { path: 'contact', component: ContactComponent},
  { path: '', component: IntroComponent },
  //  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
