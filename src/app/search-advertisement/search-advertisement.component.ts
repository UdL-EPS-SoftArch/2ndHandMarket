import { Component, OnInit } from '@angular/core';

import {Advertisement} from "../advertisement/advertisement";
import {SearchAdvertisementService} from "../search-advertisement/searchAdvertisement.service";


@Component({
  selector: 'app-search-advertisement',
  templateUrl: './search-advertisement.component.html',
  styleUrls: ['./search-advertisement.component.css'],
  providers: [SearchAdvertisementService]
})
export class SearchAdvertisementComponent implements OnInit {

  advertisements: Advertisement[] = [];
  searchInput: string = '';

  constructor(private searchAdvertisementService: SearchAdvertisementService) {
  }

  ngOnInit() {
    this.searchAdvertisementByTitle();
    this.searchAdvertisementByTag();
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
}
