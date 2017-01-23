import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Advertisement } from '../advertisement';
import { SearchAdvertisementService } from './searchAdvertisement.service';

@Component({
  selector: 'app-search-ad',
  templateUrl: './search-advertisement.component.html',
  styleUrls: ['./search-advertisement.component.scss'],
  providers: [ SearchAdvertisementService ],
})

export class SearchAdvertisementComponent implements OnInit {

  isDropdownVisible: boolean;
  searchInput: string = '';

  MAX_MATCHING_ADVERTISEMENTS = 5;
  matchingAdvertisements: Advertisement[] = [] ;

  constructor(private router: Router, private searchAdvertisement: SearchAdvertisementService) {
  }

  ngOnInit() {}

  inputChange() {
    if (this.searchInput.length < 1) {
      return;
    }

    this.searchAdvertisement.searchAdvertisementByTitle(this.searchInput)
      .subscribe(
        advertisements => { this.matchingAdvertisements = advertisements.slice(0, this.MAX_MATCHING_ADVERTISEMENTS); },
        error => console.error('Error retrieving advertisements'),
      );
  }

  submitSearch(term) {
    this.isDropdownVisible = false;
    this.searchInput = term || this.searchInput;
    this.router.navigate(['/'], { queryParams: { title: this.searchInput } });
  }

}
