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
  newOffer: Offer = new Offer();


  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.getOffers();
    //this.addOffer();

  }

  getOffers() {
    return this.offerService.getAllOffers()
      .subscribe(
        offers => this.offers = offers,
        error => this.errorMessage = <any>error.message);
  }

  addOffer() {
      this.offerService.addOffer(this.newOffer)
      .subscribe(
        offer =>  this.offers.push(offer),
        error =>  this.errorMessage = <any>error.message);
    this.newOffer = new Offer();
  }

  deleteOffer(offer) {
    this.offerService.deleteOfferByUri(offer.uri)
      .subscribe(
        deleted => this.offers = this.offers.filter(p => p.uri !== offer.uri),
        error =>  this.errorMessage = <any>error.message);
  }
}

