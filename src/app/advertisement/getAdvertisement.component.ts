import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Advertisement } from './advertisement';
import { AdvertisementService } from './advertisement.service';
import { Picture } from './picture/picture';
import { Purchase } from '../purchase/purchase';
import { PurchaseService } from '../purchase/purchase.service';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';

@Component({
  selector: 'app-get-advertisement',
  templateUrl: './getAdvertisement.component.html',
  styleUrls: ['./getAdvertisement.component.scss'],
  providers: [AdvertisementService, PurchaseService]
})
export class GetAdvertisementComponent implements OnInit {

  advertisement: Advertisement = new Advertisement();
  purchase: Purchase;
  picture: Picture = new Picture();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private advertisementService: AdvertisementService,
              private purchaseService: PurchaseService,
              private authentication: AuthenticationBasicService) {
  }

  /**
   * On Startup:
   * - Save current advertisement id on the advertisement object.
   * - Search for its remaining info (API).
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.advertisement.id = id;
        this.getAdvertisement();
      });
  }

  getAdvertisement() {
    const id = this.advertisement.id;
    this.advertisementService.getAdvertisement(id).subscribe(
      advertisement => {
        this.advertisement = advertisement;

        // The API does not provide us the id directly, so we'll store the one
        // we have from the URL.
        this.advertisement.id = id;

        // The advertisement picture is stored somewhere (let's query the API
        // for it now that we have the advertisement).
        this.getAdvertisementPicture();

        // Check advertisement purchase status.
        this.getAdvertisementPurchase();
      },
      error => alert('Error: Failed to retrieve advertisement!')
    );
  }

  getCurrentUser() : string {
    return this.authentication.getCurrentUser().username;
  }

  getAdvertisementPicture() {
    this.advertisementService.getAdvertisementPictures(this.advertisement.uri)
      .subscribe(
        pictures => this.picture = pictures.length > 0 && pictures[0],
        error => alert(error.errorMessage)
      );
  }

  getAdvertisementPurchase() {
    // HTML will hide Buy & Add to Wishlist buttons if the product has already
    // been purchased.
    this.purchaseService.getPurchaseByAdvertisement(this.advertisement)
      .subscribe(
        purchase => this.purchase = purchase,
        error => null, // Expecting a 404 if there is no purchase.
      );
  }

  deleteAdvertisement() {
    const id = this.advertisement.id;
    this.advertisementService.deleteAdvertisement(id).subscribe(
      advertisement => {
        this.advertisement = advertisement;

        // Redirect to advertisements page.
        this.router.navigate(['/advertisements']);
      },
      error => alert(`Error: ${error.message}`)
    );
  }
}
