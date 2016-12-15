import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Rx';
import {SearchActions, SEARCH_ACTIONS} from '../../../actions/search.actions';
import { IAppState } from '../../../store';
import { ActivatedRoute, Router } from '@angular/router';

import {Advertisement} from '../advertisement';
import {SearchAdvertisementService} from '../search-advertisement/searchAdvertisement.service';
import {searchReducer} from "../../../store/search.reducer";

@Component({
  selector: 'search-ad',
  templateUrl: './search-advertisement.component.html',
  styleUrls: ['search-advertisement.component.scss'],
  providers: [SearchAdvertisementService, SearchActions]
})

export class SearchAdvertisementComponent implements OnInit {

  advertisements: Advertisement[] = [];
  searchInput: string = '';
  @select(['search', 'keyword']) search$: Observable<string>;
  keyword: string;

  constructor(public actions: SearchActions,
              private ngRedux: NgRedux<IAppState>,
              private router: Router,
              private searchAdvertisementService:SearchAdvertisementService) {
  }

  ngOnInit() {
    //this.searchAdvertisementByTitle();
    //this.searchAdvertisementByTag();
    //this.searchAdvertisementByCategory();
  }

  submitSearch() {
    this.router.navigate(['/'], { queryParams: { title: this.searchInput } });
  }


  handleKeyUp(value) {
    this.keyword = value;
    this.actions.searchDispatch(value);
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
