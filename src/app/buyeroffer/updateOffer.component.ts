/**
 * Created by ierathenz on 26/11/16.
 */
import { Component, OnInit } from '@angular/core';
import { BuyerOffer } from './buyeroffer';
import { BuyerOfferService } from './buyeroffer.service';
import { Auth0Service } from '../auth0/auth0.service';


@Component({
  selector: 'app-update-offer',
  templateUrl: './updateOffer.component.html',
  styleUrls: ['./updateOffer.component.css'],
  providers: [BuyerOfferService]
})
export class UpdateOfferComponent implements OnInit {

  buyeroffers: BuyerOffer[] = [];
  errorMessage: string;
  newBuyerOffer: BuyerOffer = new BuyerOffer();

  constructor(private buyerofferService: BuyerOfferService,
              private authentication: Auth0Service) { }

  ngOnInit() {
    this.getBuyerOffer();
  }

  getBuyerOffer() {
    this.buyerofferService.getAllBuyerOffers()
      .subscribe(
        buyeroffers => this.buyeroffers = buyeroffers,
        error => this.errorMessage = <any>error.message
      );
  }

  updateOffer(existingOffer: BuyerOffer, newPrice: number) {
    let updatedOffer: BuyerOffer = existingOffer;
    updatedOffer.value = newPrice;
    updatedOffer.advertisement_id = existingOffer.advertisement_id;
    updatedOffer.advertisement_title = existingOffer.advertisement_title;
    updatedOffer.advertisement_seller = existingOffer.advertisement_seller;
    updatedOffer.advertisement_iniPrice = existingOffer.advertisement_iniPrice;
    this.buyerofferService.updateOfferById(existingOffer.uri, updatedOffer)
      .subscribe(
        update => this.buyeroffers = this.buyeroffers.map(buyerOffer => {
          if (buyerOffer.uri === existingOffer.uri) { return update; }
          return buyerOffer;
        }),
        error => this.errorMessage = <any>error.message);
  }

  getUser(): string {
    return this.authentication.getCurrentUser().username;
  }
}
