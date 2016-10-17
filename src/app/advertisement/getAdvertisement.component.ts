import { Component, OnInit } from '@angular/core';

import { Advertisement } from './advertisement';
import { AdvertisementService } from './advertisement.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-get-advertisement',
  templateUrl: './getAdvertisement.component.html',
  styleUrls: ['getAdvertisement.component.scss'],
  providers: [AdvertisementService]
})
export class GetAdvertisementComponent implements OnInit {

  advertisement: Advertisement = new Advertisement();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private advertisementService: AdvertisementService) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.getAdvertisement(id);
      });
  }

  getAdvertisement(id: number) {
    this.advertisementService.getAdvertisement(id).subscribe(
      advertisement => this.advertisement = advertisement,
      error => alert('Error: Failed to retrieve advertisement!')
    );
  }

  deleteAdvertisement() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id => {
        this.deleteAdvertisementById(id);
      }))
  }

  deleteAdvertisementById(id: number) {
    this.advertisementService.deleteAdvertisement(id).subscribe(
      advertisement => {
        this.advertisement = advertisement;

        // TODO Redirect to advertisements page.
      },
      error => alert('Error: Failed to delete advertisement!')
    )
  }
}
