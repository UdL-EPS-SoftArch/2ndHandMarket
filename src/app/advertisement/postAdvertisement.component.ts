import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import { Advertisement } from './advertisement';
import { AdvertisementService } from './advertisement.service';
import { Picture } from './picture/picture';
import { PictureService } from './picture/picture.service';
import { resizeImage } from '../../utils/images';

@Component({
  selector: 'app-post-advertisement',
  templateUrl: './postAdvertisement.component.html',
  styleUrls: ['./postAdvertisement.component.scss'],
  providers: [AdvertisementService, PictureService]
})
export class PostAdvertisementComponent implements OnInit {

  advertisement: Advertisement = new Advertisement();
  picture: Picture = new Picture();
  errorMessage: string;

  isUpdating: boolean; // Marks advertisement as a creation / update.

  constructor(private route: ActivatedRoute,
              private router: Router,
              private advertisementService: AdvertisementService,
              private pictureService: PictureService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (!id) { return; }

        // Continue from an existing advertisement (update).
        this.isUpdating = true;
        const uri = `/advertisements/${id}`;
        this.retrieveAdvertisement(uri);
      });
  }

  retrieveAdvertisement(uri: string) {
    this.advertisementService.getAdvertisement(uri).subscribe(
      advertisement => {
        this.advertisement = advertisement;

        // Get current picture (if any).
        this.getAdvertisementPicture(uri);
      },
      error => alert('Error: Failed to retrieve advertisement!'),
    );
  }

  getAdvertisementPicture(advertisementUri: string) {
    this.advertisementService.getAdvertisementPictures(advertisementUri)
      .subscribe(
        pictures => this.picture = pictures.length > 0 && pictures[0],
        error => alert(error.errorMessage)
      );
  }

  /**
   * Send form.
   */
  sendForm() {
    const action = this.isUpdating
      ? this.advertisementService.putAdvertisement
      : this.advertisementService.addAdvertisement;

    action(this.advertisement).subscribe(
        advertisement => {
          this.advertisement = advertisement;
          if (this.picture.content) {
            // A picture was attached. Link it with the current advertisement first.
            this.sendFormPicture();
          } else {
            // No picture was attached. No further steps need to be done.
            this.redirectToAdvertisement();
          }
        },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
          // TODO display error in each field
          alert(`Error: ${this.errorMessage}`);
        }
    );
  }

  /**
   * Updates the picture advertisement field to the newly created advertisement.
   */
  sendFormPicture() {
    this.picture.depicts = this.advertisement.uri;
    this.pictureService.updatePictureById(this.picture.uri, this.picture).subscribe(
      picture => this.redirectToAdvertisement(),
      error => alert(error)
    );
  }

  redirectToAdvertisement() {
    this.router.navigate([this.advertisement.uri]);
  }

  addPicture(input) {
    let file = input.files[0];
    let reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.picture.filename = file.name;
      this.picture.content = resizeImage(event.target.result, file.type, 240, 240);
      this.pictureService.addPicture(this.picture)
        .subscribe(
          picture => this.picture = picture,
          error => alert(error.message));
    }, false);

    reader.readAsDataURL(file);
  }
}
