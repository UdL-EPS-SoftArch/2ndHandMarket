import {Component, OnInit, Input} from '@angular/core';
import { BuyerOffer } from './buyeroffer';
import { BuyerOfferService } from './buyeroffer.service';


@Component({
  selector: 'app-buyeroffer',
  templateUrl: './buyeroffer.component.html',
  styleUrls: ['./buyeroffer.component.css'],
  providers: [BuyerOfferService]
})
export class BuyerOfferComponent implements OnInit {

  buyeroffers: BuyerOffer[] = [];
  errorMessage: string;
  newBuyerOffer: BuyerOffer = new BuyerOffer();

  @Input('advertisement') advertisement;

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
    this.newBuyerOffer.advertisement = this.advertisement.uri;
    this.newBuyerOffer.advertisement_id = this.advertisement.id;
    this.newBuyerOffer.advertisement_title = this.advertisement.title;
    this.newBuyerOffer.advertisement_seller = this.advertisement.owner;
    this.newBuyerOffer.advertisement_iniPrice = this.advertisement.price;
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
