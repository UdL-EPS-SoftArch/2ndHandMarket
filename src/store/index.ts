import { combineReducers } from 'redux';
import { ISearchState, searchReducer } from './search.reducer';

const persistState = require('redux-localstorage');

export class IAppState {
  search?: ISearchState
};

export const rootReducer = combineReducers<IAppState>({
  search: searchReducer
});

export const enhancers = [
  persistState('counter', { key: 'ng2-redux/examples/counter' })
];

