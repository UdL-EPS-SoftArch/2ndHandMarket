/**
 * Created by Xavier on 14/12/16.
 */
import { Component, OnInit } from '@angular/core';
import { BuyerOffer } from './buyeroffer';
import { BuyerOfferService } from './buyeroffer.service';
import { AdvertisementService } from '../advertisement/advertisement.service';
import { Advertisement } from '../advertisement/advertisement';
import { PurchaseService } from '../purchase/purchase.service';
import { Purchase } from '../purchase/purchase';
import { Auth0Service } from '../auth0/auth0.service';
import { User } from '../auth0/user';


@Component({
  selector: 'app-manage-offers',
  templateUrl: './manageOffers.component.html',
  styleUrls: ['./manageOffers.component.css'],
  providers: [BuyerOfferService, AdvertisementService, PurchaseService]
})
export class ManageOffersComponent implements OnInit {

  buyeroffers: BuyerOffer[] = [];
  errorMessage: string;
  newPurchase: Purchase = new Purchase();
  advertisements: Advertisement[] = [];
  tempAdvert: Advertisement = new Advertisement();
  newAdvert: Advertisement[] = [];
  currentFilterAdvertisement: string;
  showAll: boolean;

  constructor(private buyerOfferService: BuyerOfferService,
              private advertisementService: AdvertisementService,
              private authentication: Auth0Service,
              private purchase: PurchaseService) { }

  ngOnInit() {
    this.getBuyerOffer();
    this.getAdvertisements();
    this.currentFilterAdvertisement = '';
    this.showAll = true;
  }

  getCurrentUser(): User {
    return this.authentication.getCurrentUser();
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

  filterByAdvertisement(uri: string) {
    this.showAll = false;
    this.currentFilterAdvertisement = uri;
  }

  showAllAdvertisements() {
    this.showAll = true;
    this.currentFilterAdvertisement = '';
  }

  submitOfferAndPurchase(offer: BuyerOffer, advert: Advertisement) {
    this.rejectTheRestOfTheOffers(offer, advert);
    this.tempAdvert = new Advertisement(advert);
    offer.accepted = true;
    this.tempAdvert.owner = String(offer.buyer_id);
    this.tempAdvert.price = offer.value;
    console.log(this.tempAdvert.owner + '' + this.tempAdvert.price);
    this.newAdvert = [this.tempAdvert];
    this.newPurchase = new Purchase({ newAdvert : this.newAdvert, });
    this.purchase.addPurchase(this.newPurchase).subscribe(
      purchase => {
        this.newPurchase = purchase;
      },
      error => this.errorMessage = error.message
    );
  }

  rejectTheRestOfTheOffers(offer: BuyerOffer, advert: Advertisement) {
    for (let o of this.buyeroffers){
      if (o.advertisement_title === advert.title && o.uri !== offer.uri) {
        this.deleteBuyerOffer(o);
      }
    }
  }

  getBuyerOffer() {
    this.buyerOfferService.getAllBuyerOffers()
      .subscribe(
        buyeroffers => this.buyeroffers = buyeroffers,
        error => this.errorMessage = <any>error.message
      );
  }


  deleteBuyerOffer(buyeroffer) {
    this.buyerOfferService.deleteBuyerOfferByUri(buyeroffer.uri)
      .subscribe(
        deleted => this.buyeroffers = this.buyeroffers.filter(p => p.uri !== buyeroffer.uri),
        error =>  this.errorMessage = <any>error.message);
  }

}
