import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Rx';

import { Advertisement } from './advertisement';
import { AdvertisementService } from './advertisement.service';
import { Picture } from './picture/picture';
import {Router, ActivatedRoute} from "@angular/router";
import {SearchAdvertisementService} from "./search-advertisement/searchAdvertisement.service";

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['advertisement.component.scss'],
  providers: [AdvertisementService, SearchAdvertisementService]
})
export class AdvertisementComponent implements OnInit {

  advertisements: Advertisement[] = [];
  advertisementPictures: { [key: string]: Picture } = {};
  errorMessage: string;

  @select(['search', 'keyword']) search$: Observable<string>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private advertisementService: AdvertisementService,
              private searchAdvertisementService: SearchAdvertisementService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (queryParam: any) => {
          if (Object.keys(queryParam).length === 0) {
            this.getAdvertisements(this.advertisementService.getAllAdvertisements);
          } else {
            this.getAdvertisements(this.searchAdvertisementService.searchAdvertisementByTitle, queryParam.title);
          }
      }
    );
  }

  getAdvertisements(advertisementService, ...params) {
    return advertisementService(...params)
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
