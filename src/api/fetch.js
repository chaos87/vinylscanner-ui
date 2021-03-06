import { baseURL } from '../config/urls';
import { pad } from '../services/utils';

export const makeDiscogsSearchApiCall = async searchInput => {
  const searchUrl = baseURL + `/api/discogs`;
  let response = await fetch(searchUrl, {method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({"query": searchInput})})
    .then(response => {
      return response.json();
    })
    .catch(error => {
        return error;
    })
    return response;
};
