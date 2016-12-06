import { Component, OnInit } from '@angular/core';

import { Advertisement } from './advertisement';
import { AdvertisementService } from './advertisement.service';
import { Picture } from './picture/picture';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
  providers: [AdvertisementService]
})
export class AdvertisementComponent implements OnInit {

  advertisements: Advertisement[] = [];
  advertisementPictures: { [key: string]: Picture } = {};
  errorMessage: string;

  constructor(private advertisementService: AdvertisementService) { }

  ngOnInit() {
    this.getAdvertisements();
  }

  getAdvertisements() {
    this.advertisementService.getAllAdvertisements()
      .subscribe(
        advertisements => {
          this.advertisements = advertisements;
          this.advertisements.map((advertisement) => {
            this.getAdvertisementPicture(advertisement);
          });
        },
        error => this.errorMessage = <any>error.message
      );
  }

  getAdvertisementPicture(advertisement: Advertisement) {
    this.advertisementService.getAdvertisementPictures(advertisement.uri)
      .subscribe(
        pictures => this.advertisementPictures[advertisement.uri] = pictures[0],
        error => alert(`There was an error retrieving an advertisement picture ${error.message}`)
      );
  }

}
