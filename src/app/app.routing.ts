import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PictureComponent } from './picture/picture.component';
import { IntroComponent } from './intro/intro.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { PostAdvertisementComponent } from './advertisement/postAdvertisement.component';
import { GetAdvertisementComponent } from './advertisement/getAdvertisement.component';
import { PutAdvertisementComponent } from './advertisement/putAdvertisement.component';
import { SearchAdvertisementComponent } from './search-advertisement/search-advertisement.component';
import { ContactComponent } from './contact/contact.component';
import { MessageComponent } from './message/message.component';
import { LoggedInGuard } from './login-basic/loggedin.guard';

const appRoutes: Routes = [
  { path: 'advertisements', component: AdvertisementComponent },
  { path: 'advertisements/new', component: PostAdvertisementComponent, canActivate: [LoggedInGuard] },
  { path: 'advertisements/:id', component: GetAdvertisementComponent },
  { path: 'advertisements/:id/edit', component: PutAdvertisementComponent },
  { path: 'pictures', component: PictureComponent },
  { path: 'searchAdvertisements', component: SearchAdvertisementComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'messages', component: MessageComponent },
  { path: '', component: IntroComponent },
  //  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
