import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  filterQuery: string = "";

  constructor() {
    this.global = 1;
  }

  global : number;


  ngOnInit() {
  }

  ShowProducts(): void{
    this.global = 1;

  }

  ShowCountOffers() : void{
    this.global = 2;

  }

  AddCoupons() : void{
    this.global = 3;

  }

}
