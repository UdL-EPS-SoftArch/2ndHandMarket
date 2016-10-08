import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PictureComponent } from './picture/picture.component';
import { IntroComponent } from "./intro/intro.component";
import { MessageComponent } from "./message/message.component";

const appRoutes: Routes = [
  { path: 'pictures', component: PictureComponent },
  { path: 'messages', component: MessageComponent },
  //  { path: 'pictures/:id', component: PictureDetailComponent },
  { path: '', component: IntroComponent },
  //  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
