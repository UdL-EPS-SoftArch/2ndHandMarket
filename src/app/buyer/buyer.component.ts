import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  constructor() {
    this.global = 1;
  }
  global : number;


  ngOnInit() {
  }

  ShowOrder(): void{
    this.global = 1;

  }

  ShowWishList() : void{
    this.global = 2;

  }

  ShowOffers() : void{
    this.global = 3;

  }

  ShowCoupons() : void{
    this.global = 4;

  }

  ShowShipping() : void {
    this.global = 5;

  }

}
