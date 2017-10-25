import axios from 'axios';
import jwt from 'jsonwebtoken';

export function setPopupState (currentState) {
  return {
    type: 'SET_POPUP_STATE',
    show: !currentState,
  }
}

export function reqAuth (dispatch) {
  console.log('async auth req', this.username, this.password);
  dispatch({type: "REQ_AUTH"});
  axios.post("/api/logIn", {
    username: this.username,
    password: this.password,
  })
  .then((response) => {
    if(response.data === 'invalid') {
      dispatch({type: 'INVALID_AUTH'});
    } else {
      const token = response.data.token;
      localStorage.setItem('jwtToken', response.data.token);
      dispatch({type:"VALIDATE_AUTH", user:jwt.decode(token)});
    }
  })
  .catch((err) => {
    dispatch({type: "REQ_AUTH_FAIL"});
  })
}