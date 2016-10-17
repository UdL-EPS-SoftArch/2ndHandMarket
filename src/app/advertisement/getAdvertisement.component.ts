import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Advertisement } from './advertisement';
import { AdvertisementService } from './advertisement.service';

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

  /**
   * On Startup:
   * - Save current advertisement id on the advertisement object.
   * - Search for its remaining info (API).
   */
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.advertisement.id = id;
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
    const id = this.advertisement.id;
    this.advertisementService.deleteAdvertisement(id).subscribe(
      advertisement => {
        this.advertisement = advertisement;

        // TODO Redirect to advertisements page.
      },
      error => alert('Error: Failed to delete advertisement!')
    )
  }
}
