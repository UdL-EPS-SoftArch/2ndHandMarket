/**
 * Created by ierathenz on 26/11/16.
 */
import { Component, OnInit } from '@angular/core';
import { BuyerOffer } from './buyeroffer';
import { BuyerOfferService } from './buyeroffer.service';
import { AdvertisementService } from '../advertisement/advertisement.service';
import { Advertisement } from '../advertisement/advertisement';
import { Auth0Service } from '../auth0/auth0.service';


@Component({
  selector: 'app-manage-offers',
  templateUrl: './manageOffers.component.html',
  styleUrls: ['./manageOffers.component.css'],
  providers: [BuyerOfferService, AdvertisementService]
})
export class ManageOffersComponent implements OnInit {

  buyeroffers: BuyerOffer[] = [];
  errorMessage: string;
  newBuyerOffer: BuyerOffer = new BuyerOffer();
  advertisements: Advertisement[] = [];

  constructor(private buyerofferService: BuyerOfferService,
              private advertisementService: AdvertisementService,
              private authentication: Auth0Service) { }

  ngOnInit() {
    this.getBuyerOffer();
    this.getAdvertisements();
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

  addBuyerOffer() {
    this.buyerofferService.addBuyerOffer(this.newBuyerOffer)
      .subscribe(
        buyeroffer  => this.buyeroffers.push(buyeroffer),
        error =>  this.errorMessage = <any>error.message);
    this.newBuyerOffer = new BuyerOffer();
  }

  deleteBuyerOffer(buyeroffer) {
    this.buyerofferService.deleteBuyerOfferByUri(buyeroffer.uri)
      .subscribe(
        deleted => this.buyeroffers = this.buyeroffers.filter(p => p.uri !== buyeroffer.uri),
        error =>  this.errorMessage = <any>error.message);
  }

}
