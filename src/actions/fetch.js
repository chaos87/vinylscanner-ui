import {
     FETCH_DISCOGS_STARTED,
     FETCH_DISCOGS_FAILED,
     FETCH_DISCOGS_SUCCESS,
} from '../constants/actionTypes';
import {
    makeDiscogsSearchApiCall,
} from '../api/fetch';
import { checkAuth, refreshAuthTokenStarted } from './auth';

export function fetchDiscogs(searchQuery) {
  return function(dispatch) {
    dispatch(fetchDiscogsStarted());
    return makeDiscogsSearchApiCall(searchQuery)
      .then(data => {
          dispatch(fetchDiscogsSuccess(data));
      })
      .catch(err => {
          dispatch(fetchDiscogsFailed(err.message))
      });
  }
}

const fetchDiscogsSuccess = discs => ({
  type: FETCH_DISCOGS_SUCCESS,
  payload: discs
});

const fetchDiscogsStarted = () => ({
  type: FETCH_DISCOGS_STARTED
});

const fetchDiscogsFailed = error => ({
  type: FETCH_DISCOGS_FAILED,
  payload: {
    error
  }
});
