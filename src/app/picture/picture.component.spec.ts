/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {PictureComponent} from './picture.component';
import {PictureService} from './picture.service';

describe('Component: Picture', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PictureService]
    });
  });

  it('should create an instance', () => {
    inject([PictureService], (pictureService) => {
      let component = new PictureComponent(pictureService);
      expect(component).toBeTruthy();
    });
  });

});
