import {
    SIGNIN_USER,
    SIGNIN_USER_SUCCESS,
    SIGNOUT_USER,
    SIGNOUT_USER_SUCCESS,
    ON_SHOW_LOADER,
    HIDE_MESSAGE,
    SHOW_MESSAGE,
    INIT_URL,
    REMOVE_SESSION,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    TOGGLE_SIGNUP_PAGE
} from "constants/ActionTypes.js";

export const userSignUp = (user) => {
  return {
    type: SIGNUP_USER,
    payload: user
  };
};

export const userSignIn = (user) => {
    return {
      type: SIGNIN_USER,
      payload: user
    };
};

export const userSignInSuccess = (result) => {
    return {
      type: SIGNIN_USER_SUCCESS,
      payload: result
    }
};

export const userSignUpSuccess = (authUser) => {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: authUser
  };
};

export const userSignOut = () => {
    return {
      type: SIGNOUT_USER
    };
};

export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS,
  }
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
};

export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER,
  };
};

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};

export const removeSession = () => {
  return {
    type: REMOVE_SESSION,
  };
};

export const toggleSignUpPage = (isSignup) => {
  return {
    type: TOGGLE_SIGNUP_PAGE,
    payload: isSignup
  };
};



