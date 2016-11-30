import { Component, OnInit } from '@angular/core';
import { Offer } from './buyerOffer';
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
      this.newOffer.date = Date.now().valueOf();
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
          let offersHiddenFiltered = this.offers
            .map((offer, i) => { return [offer, this.hidden[i]]; })
            .filter((offerHidden: [Offer, boolean]) => offerHidden[0].uri !== deletedOffer.uri);
          this.offers = offersHiddenFiltered.map((offerHidden: [Offer, boolean]) => offerHidden[0]);
          this.hidden = offersHiddenFiltered.map((offerHidden: [Offer, boolean]) => offerHidden[1]);
        },
        error =>  this.errorMessage = <any>error.message);
  }

  updateOffer(existingOffer: Offer, newPrice: number) {
    let updatedOffer: Offer = existingOffer;
    updatedOffer.value = newPrice;
    this.offerService.updateOfferById(existingOffer.uri, updatedOffer)
      .subscribe(
        update => this.offers = this.offers.map(offer => {
          if (offer.uri === existingOffer.uri) { return update; }
          return offer;
        }),
        error => this.errorMessage = <any>error.message);
  }
}


