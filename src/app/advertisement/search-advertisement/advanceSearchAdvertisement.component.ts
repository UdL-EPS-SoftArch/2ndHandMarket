import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Advertisement } from '../advertisement';

@Component({
  selector: 'app-advance-search-ad',
  templateUrl: './advanceSearchAdvertisement.component.html',
  styleUrls: ['./advanceSearchAdvertisement.component.scss']
})

export class AdvanceSearchAdvertisementComponent implements OnInit {

  advertisements: Advertisement[] = [];
  searchTitleInput: string = '';
  searchTagInput: string[] = [];
  searchCategoryInput: string = '';

  constructor(private router: Router) {
  }

  ngOnInit() {}

  submitTitleSearch() {
    this.router.navigate(['/'], { queryParams: { title: this.searchTitleInput }  });
  }

  submitTagSearch() {
    this.router.navigate(['/'], { queryParams: { tag: this.searchTagInput }  });
  }

  submitCategorySearch() {
    this.router.navigate(['/'], { queryParams: { category: this.searchCategoryInput }  });
  }

}
