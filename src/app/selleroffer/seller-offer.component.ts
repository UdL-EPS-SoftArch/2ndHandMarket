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

  constructor(private sellerofferService: SellerOfferService) { }

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    return this.sellerofferService.getAllSellerOffers()
      .subscribe(
        selleroffers => this.selleroffers = selleroffers,
        error => this.errorMessage = <any>error.message
      );
  }

}
