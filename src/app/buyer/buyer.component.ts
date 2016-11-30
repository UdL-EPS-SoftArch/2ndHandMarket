import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  global : number;
  coupons : number;
  Ncoupons : number;

  constructor() {
    this.global = 1;
  }

  ngOnInit(): void {

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
    this.coupons = 1;
  }

  ShowShipping() : void {
    this.global = 5;
  }

  ShowCouponsGlobal() : void{
    this.coupons = 1;
    this.Ncoupons = -1;
  }

  ShowCouponsSeller() : void {
    this.coupons  = 2;
    this.Ncoupons = -1;
  }

}
