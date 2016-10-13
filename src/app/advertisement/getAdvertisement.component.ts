import { Component, OnInit } from '@angular/core';

import { Advertisement } from './advertisement';
import { AdvertisementService } from './advertisement.service';

@Component({
  selector: 'app-getAdvertisement',
  templateUrl: './getAdvertisement.component.html',
  styleUrls: ['getAdvertisement.component.scss'],
  providers: [AdvertisementService]
})
export class GetAdvertisementComponent implements OnInit {

  advertisement: Advertisement = new Advertisement();
  advertisementId: number = 1;

  constructor(private advertisementService: AdvertisementService) {
    // TODO advertisement id through URL
  }

  ngOnInit() {
    this.getAdvertisement();
  }

  getAdvertisement() {
    this.advertisementService.getAdvertisement(this.advertisementId).subscribe(
      advertisement => this.advertisement = advertisement,
      error => alert(`Error: Failed to retrieve advertisement!`)
    );
  }
}
