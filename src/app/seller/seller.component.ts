import { Component, OnInit } from '@angular/core';
import { BuyerOffer } from '../buyeroffer/buyeroffer';
import { BuyerOfferService } from '../buyeroffer/buyeroffer.service';
import { AdvertisementService } from '../advertisement/advertisement.service';
import { Advertisement } from '../advertisement/advertisement';
import { Auth0Service } from '../auth0/auth0.service';
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
  providers: [BuyerOfferService, AdvertisementService]
})
export class SellerComponent implements OnInit {

  filterQuery = '';
  global: number;
  advertisements: Advertisement[] = [];
  buyeroffers: BuyerOffer[] = [];
  errorMessage: string;
  coupons = 0;

  constructor(private buyerofferService: BuyerOfferService,
              private advertisementService: AdvertisementService,
              private authentication: Auth0Service) {

  }

  ngOnInit() {
    this.global = 1;
    this.getBuyerOffer();
    this.getAdvertisements();
    this.getCoupons();
  }

  ShowProducts(): void {
    this.global = 1;
  }

  ShowCountOffers(): void {
    this.global = 2;
  }

  AddCoupons(): void {
    this.global = 3;
  }

  getCoupons(): number {
    return this.coupons;
  }


  getAdvertisements() {
    this.advertisementService.getAllAdvertisements()
      .subscribe(
        advertisements => {
          this.advertisements = advertisements;
        },
        error => this.errorMessage = <any>error.message
      );
  }

  getBuyerOffer() {
    this.buyerofferService.getAllBuyerOffers()
      .subscribe(
        buyeroffers => this.buyeroffers = buyeroffers,
        error => this.errorMessage = <any>error.message
      );
  }
}
