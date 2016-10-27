import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Advertisement } from './advertisement';
import { AdvertisementService } from './advertisement.service';
import { Picture } from '../picture/picture';
import { PictureService } from '../picture/picture.service';

@Component({
  selector: 'app-post-advertisement',
  templateUrl: './postAdvertisement.component.html',
  styleUrls: ['postAdvertisement.component.scss'],
  providers: [AdvertisementService, PictureService]
})
export class PostAdvertisementComponent implements OnInit {

  advertisement: Advertisement = new Advertisement();
  picture: Picture = new Picture();
  errorMessage: string;

  constructor(private router: Router,
              private advertisementService: AdvertisementService,
              private pictureService: PictureService) { }

  ngOnInit() { }

  sendForm() {
    this.advertisementService.addAdvertisement(this.advertisement).subscribe(
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
          alert(this.errorMessage);
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
      this.picture.content = this.resizeImage(event.target.result, file.type, 240, 240);
      this.pictureService.addPicture(this.picture)
        .subscribe(
          picture => this.picture = picture,
          error => alert(error.message));
    }, false);

    reader.readAsDataURL(file);
  }

  resizeImage(imageData, type, MAX_WIDTH = 480, MAX_HEIGHT = 480) {
    let img = document.createElement('img');
    img.src = imageData;
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }

    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);

    return canvas.toDataURL(type);
  }
}
