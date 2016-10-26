import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Advertisement } from './advertisement';
import { AdvertisementService } from './advertisement.service';

@Component({
  selector: 'app-post-advertisement',
  templateUrl: './postAdvertisement.component.html',
  styleUrls: ['postAdvertisement.component.scss'],
  providers: [AdvertisementService]
})
export class PutAdvertisementComponent implements OnInit {

  advertisement: Advertisement = new Advertisement();
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private advertisementService: AdvertisementService) { }

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
        this.retrieveAdvertisement();
      })
  }

  retrieveAdvertisement() {
    const id = this.advertisement.id;
    this.advertisementService.getAdvertisement(id).subscribe(
      advertisement => {
        this.advertisement = advertisement;

        // The API does not provide us the id directly, so we'll store the one we have from the URL.
        this.advertisement.id = id;
      },
      error => alert('Error: Failed to retrieve advertisement!')
    );
  }

  sendForm() {
    this.advertisementService.putAdvertisement(this.advertisement).subscribe(
        advertisement => {
          // Redirect to the advertisement
          this.router.navigate([advertisement.uri]);
        },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
          // TODO display error in each field
          alert(this.errorMessage);
        }
    );
  }
}
