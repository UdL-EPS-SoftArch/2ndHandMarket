import { Component, OnInit } from '@angular/core';
import { BuyerOffer } from '../buyeroffer/buyeroffer';
import { BuyerOfferService } from '../buyeroffer/buyeroffer.service';
import { AdvertisementService } from '../advertisement/advertisement.service';
import { Advertisement } from '../advertisement/advertisement';
import { Auth0Service } from '../auth0/auth0.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css'],
  providers: [BuyerOfferService, AdvertisementService]
})
export class BuyerComponent implements OnInit {

  filterQuery;

  global: number;
  coupons: number;
  Ncoupons: number;
  advertisements: Advertisement[] = [];
  buyeroffers: BuyerOffer[] = [];
  errorMessage: string;

  constructor(private buyerofferService: BuyerOfferService,
              private advertisementService: AdvertisementService,
              private authentication: Auth0Service) {

  }

  ngOnInit(): void {
    this.global = 1;
    this.Ncoupons = -1;
    this.getBuyerOffer();
    this.getAdvertisements();
  }

  ShowOrder(): void {
    this.global = 1;
  }

  ShowWishList(): void {
    this.global = 2;
  }

  ShowOffers(): void {
    this.global = 3;
  }

  ShowCoupons(): void {
    this.global = 4;
    this.coupons = 1;
  }

  ShowShipping(): void {
    this.global = 5;
  }

  ShowCouponsGlobal(): void {
    this.coupons = 1;
  }

  ShowCouponsSeller(): void {
    this.coupons  = 2;
    this.Ncoupons = -1;
  }
  getCurrentUser(): string {
    return this.authentication.getCurrentUser().username;
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
