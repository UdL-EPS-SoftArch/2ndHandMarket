import { Component, OnInit } from '@angular/core';

import {Advertisement} from '../advertisement';
import {SearchAdvertisementService} from '../search-advertisement/searchAdvertisement.service';

@Component({
  selector: 'search-ad',
  templateUrl: './search-advertisement.component.html',
  styleUrls: ['search-advertisement.component.scss'],
  providers: [SearchAdvertisementService]
})
export class SearchAdvertisementComponent implements OnInit {

  advertisements: Advertisement[] = [];
  searchInput: string = '';

  constructor(private searchAdvertisementService:SearchAdvertisementService) {
  }

  ngOnInit() {
    this.searchAdvertisementByTitle();
    this.searchAdvertisementByTag();
    this.searchAdvertisementByCategory();
  }

  searchAdvertisementByTitle() {
    this.searchAdvertisementService.searchAdvertisementByTitle(this.searchInput).subscribe(
      advertisements => this.advertisements = advertisements,
      error => alert('Error: Failed to retrieve advertisement!')
    );
  }

  searchAdvertisementByTag() {
    this.searchAdvertisementService.searchAdvertisementByTag(this.searchInput).subscribe(
      advertisements => this.advertisements = advertisements,
      error => alert('Error: Failed to retrieve advertisement!')
    );
  }

  searchAdvertisementByCategory() {
    this.searchAdvertisementService.searchAdvertisementByCategory(this.searchInput).subscribe(
      advertisements => this.advertisements = advertisements,
      error => alert('Error: Failed to retrieve advertisement!')
    );
  }
}
