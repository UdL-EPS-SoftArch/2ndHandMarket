import { NgRedux } from 'ng2-redux';
import { Http } from '@angular/http';

export const SEARCH_ACTIONS = {
  SEARCH: 'SEARCH',
  SEARCH_RESULT: 'SEARCH_RESULT',
  TERMINATE: 'TERMINATE',
  SEARCH_NEXT: 'SEARCH_NEXT',
  SEARCH_PREVIOUS: 'SEARCH_PREVIOUS'
};

import { Injectable } from '@angular/core';

@Injectable()
export class SearchActions {
  keyword: string;

  constructor(private http: Http,
              private ngRedux: NgRedux<any>) {}

  searchDispatch(keyword: string) {
    this.ngRedux.dispatch(this.search(keyword));
  }

  private search(keyword: string) {
    return {
      type: SEARCH_ACTIONS.SEARCH,
      payload: keyword
    };
  }
}
