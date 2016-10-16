import { Component, OnInit } from '@angular/core';
import {RegisterSellerService} from "./register-seller.service";
import {RegisterSeller} from "./register-seller";

@Component({
  selector: 'app-register-seller',
  templateUrl: './register-seller.component.html',
  styleUrls: ['./register-seller.component.css'],
  providers: [RegisterSellerService]
})

export class RegisterSellerComponent implements OnInit {

  sellers: RegisterSeller[] = [];
  errorMessage: string;
  newSeller: RegisterSeller = new RegisterSeller();

  constructor(private registerSellerService: RegisterSellerService) { }

  ngOnInit() { this.getSellers(); this.addSeller() }

  getSellers() {
    return this.registerSellerService.getAllSellers()
      .subscribe(
        sellers => this.sellers = sellers,
        error => this.errorMessage = <any>error.message
      );
  }

  addSeller(/*input*/) {

    this.newSeller.name = "pepo";
    this.newSeller.mail = "pepo@pepo.com";
    this.newSeller.password="pepopepo";
    this.registerSellerService.addSeller(this.newSeller)
      .subscribe(
        seller  => this.sellers.push(seller),
        error =>  this.errorMessage = <any>error.message);
    this.newSeller = new RegisterSeller();
  }

}
