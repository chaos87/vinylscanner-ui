import { cognitoURL } from '../config/urls';


export const googleSignInApi = async (code, redirectUrl) => {
    const payload = {
        "grant_type": "authorization_code",
        "client_id": "ioc356ekbu4m2u1ged1lkphld",
        "redirect_uri": redirectUrl,
        "code": code
    }
    const formBody = Object.keys(payload).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(payload[key])).join('&')
    let response = await fetch(cognitoURL + '/oauth2/token', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        return err;
    })
    return response;
}
