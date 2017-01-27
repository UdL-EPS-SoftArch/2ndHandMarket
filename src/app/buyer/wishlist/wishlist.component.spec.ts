import {TestBed, async, inject} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { WishListComponent } from './wishlist.component';
import { WishlistService } from './wishlist.service';
import { Auth0Service } from '../../auth0/auth0.service';
import { AdvertisementService } from '../../advertisement/advertisement.service';

describe('Component: Wishlist', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WishlistService]
    });
  });


  it('should create an instance', () => {
    inject([WishlistService, Router, Auth0Service, ActivatedRoute, AdvertisementService] ,
      (activatedRouter, router, wishlistService, authentication, advertisementService) => {
      let component = new WishListComponent(
        activatedRouter,
        router,
        wishlistService,
        authentication,
        advertisementService,
      );
      expect(component).toBeTruthy();
    });

});

});

