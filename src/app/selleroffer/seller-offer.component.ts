import { Component, OnInit } from '@angular/core';
import { SellerOffer } from './seller-offer';
import { SellerOfferService } from './seller-offer.service';


@Component({
  selector: 'app-selleroffer',
  templateUrl: './seller-offer.component.html',
  styleUrls: ['./seller-offer.component.css'],
  providers: [SellerOfferService]
})
export class SellerOfferComponent implements OnInit {

  selleroffers: SellerOffer[] = [];
  errorMessage: string;
  newSelleroffer: SellerOffer = new SellerOffer();

  constructor(private sellerofferService: SellerOfferService) { }

  ngOnInit() {
    this.getSellerOffer();
  }

  getSellerOffer() {
    return this.sellerofferService.getAllSellerOffers()
      .subscribe(
        selleroffers => this.selleroffers = selleroffers,
        error => this.errorMessage = <any>error.message
      );
  }

  addSellerOffer() {
    this.sellerofferService.addSellerOffer(this.newSelleroffer)
      .subscribe(
        selleroffer  => this.selleroffers.push(selleroffer),
        error =>  this.errorMessage = <any>error.message);
    this.newSelleroffer = new SellerOffer();
  }

  removeSellerOffers(selleroffer) {
    this.sellerofferService.deleteSellerOfferByUri(selleroffer.uri)
      .subscribe(
        deleted => this.selleroffers = this.selleroffers.filter(p => p.uri !== selleroffer.uri),
        error =>  this.errorMessage = <any>error.message);
  }

}
