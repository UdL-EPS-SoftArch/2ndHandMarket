import {Component, OnInit, Output, Input} from '@angular/core';
import { BuyerOffer } from './buyeroffer';
import { BuyerOfferService } from './buyeroffer.service';
import {EventEmitter} from "@angular/common/src/facade/async";


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

  //@Output() retrieveAdvertisement:EventEmitter<any> = new EventEmitter();
  @Input('advertisement') advertisement;

  constructor(private buyerofferService: BuyerOfferService) { }

  ngOnInit() {
    this.getBuyerOffer();
    console.info(this.advertisement);
  }

  getBuyerOffer() {
    return this.buyerofferService.getAllBuyerOffers()
      .subscribe(
        buyeroffers => this.buyeroffers = buyeroffers,
        error => this.errorMessage = <any>error.message
      );
  }

  addBuyerOffer() {
    this.newBuyerOffer.advertisement_id = this.advertisement.id;
    console.info(this.newBuyerOffer);
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
