import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Advertisement } from './advertisement';
import { AdvertisementService } from './advertisement.service';

@Component({
  selector: 'app-post-advertisement',
  templateUrl: './postAdvertisement.component.html',
  styleUrls: ['postAdvertisement.component.scss'],
  providers: [AdvertisementService]
})
export class PostAdvertisementComponent implements OnInit {

  advertisement: Advertisement = new Advertisement();
  errorMessage: string;

  constructor(private router: Router, private advertisementService: AdvertisementService) { }

  ngOnInit() { }

  sendForm() {
    this.advertisementService.addAdvertisement(this.advertisement).subscribe(
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
