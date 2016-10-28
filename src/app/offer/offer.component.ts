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
  hidden: boolean[] = [];
  errorMessage: string;
  newOffer: Offer = new Offer();

  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.getOffers();
  }

  getOffers() {
    return this.offerService.getAllOffers()
      .subscribe(
        offers => {
          this.offers = offers;
          this.hidden = this.offers.map(offer => true);
        },
        error => this.errorMessage = <any>error.message);
  }

  addOffer() {
      this.offerService.addOffer(this.newOffer)
      .subscribe(
        offer =>  {
          this.offers.push(offer);
          this.hidden.push(true);
        },
        error =>  this.errorMessage = <any>error.message);
    this.newOffer = new Offer();
  }

  deleteOffer(deletedOffer) {
    this.offerService.deleteOfferByUri(deletedOffer.uri)
      .subscribe(
        deleted => {
          this.offers = this.offers.filter(offer => offer.uri !== deletedOffer.uri);
          this.hidden.pop();
          this.hidden = this.hidden.map(hidden => true);
        },
        error =>  this.errorMessage = <any>error.message);
  }

  updateOffer(existingOffer: Offer, newPrice: number) {
    let updatedOffer: Offer = existingOffer;
    updatedOffer.value = newPrice;
    this.offerService.updateOfferById(existingOffer.uri, updatedOffer)
      .subscribe(
        update => this.offers = this.offers.map(offer => {
          if (offer.uri == existingOffer.uri) { return update; }
          return offer;
        }),
        error => this.errorMessage = <any>error.message);
  }
}


