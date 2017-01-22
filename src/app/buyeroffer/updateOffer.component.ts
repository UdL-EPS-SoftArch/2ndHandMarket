/**
 * Created by ierathenz on 26/11/16.
 */
import { Component, OnInit } from '@angular/core';
import { BuyerOffer } from './buyeroffer';
import { BuyerOfferService } from './buyeroffer.service';
import { Auth0Service } from '../auth0/auth0.service';


@Component({
  selector: 'app-update-offer',
  templateUrl: './updateOffer.component.html',
  styleUrls: ['./updateOffer.component.css'],
  providers: [BuyerOfferService]
})
export class UpdateOfferComponent implements OnInit {

  buyeroffers: BuyerOffer[] = [];
  errorMessage: string;
  newBuyerOffer: BuyerOffer = new BuyerOffer();
  buyeroffer: BuyerOffer = new BuyerOffer();
  public edited = false;

  hasDeleteConfirm: boolean = false;
  deleteConfirmText: String = '';
  isDeleting: boolean = false;

  constructor(private buyerofferService: BuyerOfferService,
              private authentication: Auth0Service) { }

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

  toggleDeleteAdvertisementConfirm(buyeroffer) {
    this.hasDeleteConfirm = !this.hasDeleteConfirm;
    /*this.buyeroffer = this.buyeroffer;*/
  }

  deleteBuyerOfferConfirm(buyeroffer) {
    /*const deleteConfirmText = this.deleteConfirmText.trim().toLowerCase();
    const advertisementTitle = this.buyeroffer.advertisement_title.trim().toLowerCase();

    if (deleteConfirmText === advertisementTitle) {
      this.deleteBuyerOffer(buyeroffer);
    }*/
    this.deleteBuyerOffer(buyeroffer);
  }

  deleteBuyerOffer(buyeroffer) {
    this.hasDeleteConfirm = false;
    this.isDeleting = true;

    this.buyerofferService.deleteBuyerOfferByUri(buyeroffer.uri)
      .subscribe(
        deleted => {
          this.isDeleting = false;
          this.buyeroffers = this.buyeroffers.filter(p => p.uri !== buyeroffer.uri);
        },
        error => {
          this.isDeleting = false;
          this.errorMessage = <any>error.message;
        }
      );
  }

  updateOffer(existingOffer: BuyerOffer, newPrice: number) {
    this.saveTodos();
    existingOffer.value = newPrice;
    this.buyerofferService.updateOfferById(existingOffer.uri, existingOffer)
      .subscribe(
        update => this.buyeroffers = this.buyeroffers.map(buyerOffer => {
          if (buyerOffer.uri === existingOffer.uri) { return update; }
          return buyerOffer;
        }),
        error => this.errorMessage = <any>error.message);

  }

  getUser(): string {
    return this.authentication.getCurrentUser().username;
  }

  saveTodos(): void {
    this.edited = true;
    setTimeout(function() {
      this.edited = false;
      console.log(this.edited);
    }.bind(this), 3000);
  }
}
