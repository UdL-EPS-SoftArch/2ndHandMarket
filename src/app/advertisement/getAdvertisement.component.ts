import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Advertisement } from './advertisement';
import { AdvertisementService } from './advertisement.service';
import { Picture } from './picture/picture';
import { Purchase } from '../purchase/purchase';
import { PurchaseService } from '../purchase/purchase.service';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { BasketProductService} from '../basketProduct/basketProduct.service';
import { BasketProduct} from '../basketProduct/basketProduct';

@Component({
  selector: 'app-get-advertisement',
  templateUrl: './getAdvertisement.component.html',
  styleUrls: ['./getAdvertisement.component.scss'],
  providers: [AdvertisementService, PurchaseService]
})
export class GetAdvertisementComponent implements OnInit {

  advertisement: Advertisement;
  purchase: Purchase;
  picture: Picture;

  hasDeleteConfirm: boolean = false;
  deleteConfirmText: String = '';
  isDeleting: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private advertisementService: AdvertisementService,
              private purchaseService: PurchaseService,
              private authentication: AuthenticationBasicService,
              private basketProductService: BasketProductService) {
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
        const uri = `/advertisements/${id}`;
        this.getAdvertisement(uri);
      });
  }

  getAdvertisement(uri: string) {
    this.advertisementService.getAdvertisement(uri).subscribe(
      advertisement => {
        this.advertisement = advertisement;

        // The advertisement does exist, let's query the rest.
        this.getAdvertisementPicture(this.advertisement.uri);
        this.getAdvertisementPurchase(this.advertisement.uri);
      },
      error => alert('Error: Failed to retrieve advertisement!')
    );
  }

  getAdvertisementPicture(advertisementUri: string) {
    this.advertisementService.getAdvertisementPictures(advertisementUri)
      .subscribe(
        pictures => this.picture = pictures.length > 0 && pictures[0],
        error => null, // Could be 404 if pictures were never created.
      );
  }

  getAdvertisementPurchase(advertisementUri: string) {
    this.purchaseService.getPurchaseByAdvertisement(advertisementUri)
      .subscribe(
        purchase => this.purchase = purchase,
        error => null, // Expecting a 404 if there is no purchase.
      );
  }

  toggleDeleteAdvertisementConfirm() {
    this.hasDeleteConfirm = !this.hasDeleteConfirm;
  }

  deleteAdvertisementForm(uri: string) {
    const deleteConfirmText = this.deleteConfirmText.trim().toLowerCase();
    const advertisementTitle = this.advertisement.title.trim().toLowerCase();
    if (deleteConfirmText === advertisementTitle) {
      this.deleteAdvertisement(uri);
    }
  }

  deleteAdvertisement(uri: string) {
    this.hasDeleteConfirm = false;
    this.isDeleting = true;
    this.advertisementService.deleteAdvertisement(uri).subscribe(
      advertisement => {
        this.isDeleting = false;
        // Redirect to advertisements page.
        this.router.navigate(['/advertisements']);
      },
      error => {
        this.isDeleting = false;
        alert(`Error: ${error.message}`);
      }
    );
  }

  getCurrentUser(): string {
    return this.authentication.getCurrentUser().username;
  }

  addProduct(advertisement): void {
    let basketProduct: BasketProduct = new BasketProduct();
    basketProduct.product = advertisement;
    this.basketProductService.addProduct(basketProduct);
  }
}
