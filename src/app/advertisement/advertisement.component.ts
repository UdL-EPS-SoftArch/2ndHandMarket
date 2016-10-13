import { Component, OnInit } from '@angular/core';

import { Advertisement } from './advertisement';
import { AdvertisementService } from './advertisement.service';


@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['advertisement.component.scss'],
  providers: [AdvertisementService]
})
export class AdvertisementComponent implements OnInit {

  advertisements: Advertisement[] = [];
  errorMessage: string;

  constructor(private advertisementService: AdvertisementService) { }

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    return this.advertisementService.getAllAdvertisements()
      .subscribe(
        advertisements => this.advertisements = advertisements,
        error => this.errorMessage = <any>error.message
      );
  }

}
