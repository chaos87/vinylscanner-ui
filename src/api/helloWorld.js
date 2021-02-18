import { baseURL } from '../config/urls';

export const helloWorld = async (token) => {
    fetch(baseURL + '/auth/helloWorld', {
      method: 'GET',
      headers: {
        'accessToken': token
      }
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        return err;
    })
}
