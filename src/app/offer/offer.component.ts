import { Component, OnInit } from '@angular/core';
import { Offer } from './offer';
import { OfferService } from './offer.service';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
  providers: [OfferService]
})

export class OfferComponent implements OnInit {

  offers: Offer[] = [];
  errorMessage: string;

  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.getOffers();
  }

  getOffers() {
    return this.offerService.getAllOffers()
      .subscribe(
        offers => this.offers = offers,
        error => this.errorMessage = <any>error.message
      );
  }
}

