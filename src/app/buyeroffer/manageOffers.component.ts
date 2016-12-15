/**
 * Created by ierathenz on 26/11/16.
 */
import { Component, OnInit } from '@angular/core';
import { BuyerOffer } from './buyeroffer';
import { BuyerOfferService } from './buyeroffer.service';
import { AdvertisementService } from '../advertisement/advertisement.service';
import {Advertisement} from "../advertisement/advertisement";
import {AuthenticationBasicService} from "../login-basic/authentication-basic.service";


@Component({
  selector: 'app-manageOffers',
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
              private authentication: AuthenticationBasicService) { }

  ngOnInit() {
    this.getBuyerOffer();
    this.getAdvertisements();
  }

  getCurrentUser() : string {
    return this.authentication.getCurrentUser().username;
  }

  /*getAdvertisementId(adv: Advertisement) : number {
    return adv.getUriId();
  }*/

  test(advert: Advertisement){
    console.info(advert.uri);
    //console.info(advert.getUriId());
  }

  getAdvertisements() {
    return this.advertisementService.getAllAdvertisements()
      .subscribe(
        advertisements => {
          this.advertisements = advertisements;
        },
        error => this.errorMessage = <any>error.message
      );
  }

  getBuyerOffer() {
    return this.buyerofferService.getAllBuyerOffers()
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
