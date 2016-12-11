import { tassign } from 'tassign';
import { SEARCH_ACTIONS } from '../actions/search.actions';

export interface ISearchState {
  onSearch: boolean;
  keyword: string;
}

const INIT_STATE: ISearchState = {
  onSearch: false,
  keyword: '',
};

export function searchReducer(
  state = INIT_STATE,
  action): ISearchState {

  switch (action.type) {
    case SEARCH_ACTIONS.SEARCH:
      return tassign(state, {
        onSearch: true,
        keyword: action.payload,
      });
    case SEARCH_ACTIONS.SEARCH_RESULT:
      return tassign(state, {
        onSearch: state.onSearch,
        keyword: state.keyword,
      });
    default:
      return state;
  }
}
