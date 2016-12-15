/**
 * Created by ierathenz on 26/11/16.
 */
import { Component, OnInit } from '@angular/core';
import { BuyerOffer } from './buyeroffer';
import { BuyerOfferService } from './buyeroffer.service';


@Component({
  selector: 'app-personal-offers-list',
  templateUrl: './personalOffersList.component.html',
  styleUrls: ['./personalOffersList.component.css'],
  providers: [BuyerOfferService]
})
export class PersonalOffersListComponent implements OnInit {

  buyeroffers: BuyerOffer[] = [];
  errorMessage: string;
  newBuyerOffer: BuyerOffer = new BuyerOffer();

  constructor(private buyerofferService: BuyerOfferService) { }

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
