import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Rx';

import { Advertisement } from './advertisement';
import { AdvertisementService } from './advertisement.service';
import { Picture } from './picture/picture';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['advertisement.component.scss'],
  providers: [AdvertisementService]
})
export class AdvertisementComponent implements OnInit {

  advertisements: Advertisement[] = [];
  advertisementPictures: { [key: string]: Picture } = {};
  errorMessage: string;

  @select(['search', 'keyword']) search$: Observable<string>;

  constructor(private advertisementService: AdvertisementService) { }

  ngOnInit() {
    this.getAdvertisements();
  }

  getAdvertisements() {
    return this.advertisementService.getAllAdvertisements()
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
        error => alert(error.errorMessage)
      );
  }

}
