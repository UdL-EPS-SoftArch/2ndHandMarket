import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Advertisement } from '../advertisement';

@Component({
  selector: 'app-advanceSearch-ad',
  templateUrl: './advanceSearch-advertisement.component.html',
  styleUrls: ['./advanceSearch-advertisement.component.scss']
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
