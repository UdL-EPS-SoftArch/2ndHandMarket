import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../auth0/user';
import { Auth0Service } from '../../auth0/auth0.service';

import { WishlistService } from './wishlist.service';
import { AdvertisementService} from '../../advertisement/advertisement.service';
import { Advertisement } from '../../advertisement/advertisement';
import { error } from 'util';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  providers: [AdvertisementService, WishlistService, Auth0Service],
})

export class WishListComponent implements OnInit {
  errorMessage: string;
  loading: true;

  user: User = new User();
  hasWishes: false;
  advertisement: Advertisement[] = [];
  wishers: Advertisement[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private advertisementService: AdvertisementService,
              private wishlistService: WishlistService,
              private authentication: Auth0Service) {

  }

  ngOnInit() {
  }

  loadProduct(uri: string) {
    this.advertisementService.getAdvertisement(uri).subscribe(
      advertisement => {
        this.wishers.push(advertisement);
      },
      error => this.errorMessage = 'This product doesn\'t exist',
    );
  }

  addWishlist() {
  }
}
