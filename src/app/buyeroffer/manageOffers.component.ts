/**
 * Created by Xavier on 14/12/16.
 */
import { Component, OnInit } from '@angular/core';
import { BuyerOffer } from './buyeroffer';
import { BuyerOfferService } from './buyeroffer.service';
import { AdvertisementService } from '../advertisement/advertisement.service';
import { Advertisement } from '../advertisement/advertisement';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import {PurchaseService} from "../purchase/purchase.service";
import {Purchase} from "../purchase/purchase";


@Component({
  selector: 'app-manage-offers',
  templateUrl: './manageOffers.component.html',
  styleUrls: ['./manageOffers.component.css'],
  providers: [BuyerOfferService, AdvertisementService, PurchaseService]
})
export class ManageOffersComponent implements OnInit {

  buyeroffers: BuyerOffer[] = [];
  errorMessage: string;
  newBuyerOffer: BuyerOffer = new BuyerOffer();
  newPurchase: Purchase = new Purchase();
  advertisements: Advertisement[] = [];
  hasPurchased: boolean = false;
  advertisement: Advertisement;

  constructor(private buyerofferService: BuyerOfferService,
              private advertisementService: AdvertisementService,
              private authentication: AuthenticationBasicService,
              private purchase: PurchaseService) { }

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

  submitOfferAndPurchase(offer : BuyerOffer, advert : Advertisement){
    advert.price = offer.value;
    this.newPurchase = new Purchase({ advert, });
    this.purchase.addPurchase(this.newPurchase).subscribe(
      purchase => {
        this.newPurchase = purchase;
        this.hasPurchased = true;
      },
      error => this.errorMessage = error.message
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
