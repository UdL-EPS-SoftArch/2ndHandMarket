import {Component, OnInit} from '@angular/core';
import {Picture} from './picture';
import {PictureService} from './picture.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css'],
  providers: [PictureService]
})
export class PictureComponent implements OnInit {

  pictures: Picture[] = [];
  errorMessage: string;
  newPicture: Picture = new Picture();

  constructor(private pictureService: PictureService) { }

  ngOnInit() { this.getPictures(); }

  getPictures() {
    return this.pictureService.getAllPictures()
      .subscribe(
        pictures => this.pictures = pictures,
        error =>  this.errorMessage = <any>error.message);
  }

  addPicture(input) {
    let file = input.files[0];
    let reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.newPicture.filename = file.name;
      this.newPicture.content = this.resizeImage(event.target.result, file.type, 240, 240);
      this.pictureService.addPicture(this.newPicture)
        .subscribe(
          picture  => this.pictures.push(picture),
          error =>  this.errorMessage = <any>error.message);
      this.newPicture = new Picture();
    }, false);

    reader.readAsDataURL(file);
  }

  removePicture(picture) {
    this.pictureService.deletePictureByUri(picture.uri)
      .subscribe(
        deleted => this.pictures = this.pictures.filter(p => p.uri !== picture.uri),
        error =>  this.errorMessage = <any>error.message);
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
