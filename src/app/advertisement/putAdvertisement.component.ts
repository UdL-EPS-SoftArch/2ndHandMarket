import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
export class PutAdvertisementComponent implements OnInit {

  advertisement: Advertisement = new Advertisement();
  picture: Picture = new Picture();
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private advertisementService: AdvertisementService,
              private pictureService: PictureService) { }

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
      });
  }

  retrieveAdvertisement() {
    const id = this.advertisement.id;
    this.advertisementService.getAdvertisement(id).subscribe(
      advertisement => {
        this.advertisement = advertisement;

        // The API does not provide us the id directly, so we'll store the one we have from the URL.
        this.advertisement.id = id;

        this.getAdvertisementPicture();
      },
      error => alert('Error: Failed to retrieve advertisement!')
    );
  }

  getAdvertisementPicture() {
    this.advertisementService.getAdvertisementPictures(this.advertisement.uri)
      .subscribe(
        pictures => this.picture = pictures.length > 0 && pictures[0],
        error => alert(error.errorMessage)
      );
  }

  /**
   * Send form.
   */
  sendForm() {
    this.advertisementService.putAdvertisement(this.advertisement).subscribe(
        advertisement => {
          this.advertisement = advertisement;
          if (this.picture.content) {
            // A picture was attached. Link it with the current advertisement first.
            this.sendFormPicture();
          } else {
            // No picture was attached. No further steps need to be done.
            this.redirectToAdvertisement();
          }

          // Redirect to the advertisement
          this.router.navigate([this.advertisement.uri]);
        },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
          // TODO display error in each field
          alert(this.errorMessage);
        }
    );
  }

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
