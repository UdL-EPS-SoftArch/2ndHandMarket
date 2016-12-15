import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Advertisement } from '../advertisement';

@Component({
  selector: 'search-ad',
  templateUrl: './search-advertisement.component.html',
  styleUrls: ['./search-advertisement.component.scss']
})

export class SearchAdvertisementComponent implements OnInit {

  advertisements: Advertisement[] = [];
  searchInput: string = '';

  constructor(private router: Router) {
  }

  ngOnInit() {}

  submitSearch() {
    this.router.navigate(['/'], { queryParams: { title: this.searchInput } });
  }

}
