import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import {
    SIGNIN_USER,
    SIGNUP_USER
} from "constants/ActionTypes";

import {showAuthMessage, userSignInSuccess, userSignUp, userSignUpSuccess,toggleSignUpPage} from "../actions/Auth";

const signUpUserRequest = async  (body) => {

  return fetch('https://localhost:44394/users', {
    method: "POST",
    headers: { 
        "Content-Type": "application/json", 
    },
    body: JSON.stringify(body)
  })

}
const signInUserWithEmailPasswordRequest = async (email, password) =>
   await fetch('https://localhost:44394/token/', {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded"},
      body: new URLSearchParams("grant_type=password&username="+email+"&password="+password),
   })
    .then(authUser =>  authUser.json())
    .catch(error => error); 

function* userSignUpAction({payload}){
  var body = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    password: payload.password
}
  try {
    const response = yield call(signUpUserRequest, body);
    const result =  response;
    console.log('response received response', response)
    if (result.status === 201) {
      yield put(toggleSignUpPage(false));
      yield put(showAuthMessage('User have been created'));  
      yield put(userSignUpSuccess(signInUser));
      console.log('user created', result.status);

        
    } else {
      
      const responseJson =  yield response.json();
      const finalResponse = responseJson; 
      if (responseJson.detail){
        yield put(showAuthMessage(responseJson.detail));
      }else{
        var fisrtValueKey = null;
        var firstError = null;
        var message = 'An error has ocurred';
        (typeof finalResponse === 'object' && Object.keys(finalResponse).length > 0 ) && 
          (fisrtValueKey = Object.keys(finalResponse)[0]);
        fisrtValueKey &&
          (firstError = finalResponse[fisrtValueKey][0]);
        firstError && (message = firstError);
        console.log('whole response',responseJson)
        yield put(showAuthMessage(message));
      }
    }
  }catch(error){
    yield put(showAuthMessage('User already created'));
    console.log('Sign up error', error)
  }
}

function* signInUserWithEmailPassword({payload}) {
    const {email, password} = payload;
    try {
      const signInUser = yield call(signInUserWithEmailPasswordRequest, email, password);

      console.log('user logged', signInUser)
      if (signInUser.access_token) {
        localStorage.setItem('token',signInUser.access_token)
        signInUser.username = email;
        localStorage.setItem('isUserActive',true) 
        yield put(userSignInSuccess(signInUser));
        console.log('sign in success')
      } else {
        yield put(showAuthMessage(signInUser.error_description));
        console.log('Sign in error', signInUser.error_description)
      }
    } catch (error) {
      yield put(showAuthMessage(error));
      console.log('Sign in error', error)
    }
}
export function* signUpUser() {
  yield takeEvery(SIGNUP_USER, userSignUpAction);
}

export function* signInUser() {
    yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export default function* rootSaga() {
  yield all([fork(signInUser),
    fork(signUpUser)
  ]);
}