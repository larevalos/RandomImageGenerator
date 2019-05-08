import {
    SIGNIN_USER_SUCCESS,
    SIGNUP_USER_SUCCESS,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    HIDE_MESSAGE,
    SHOW_MESSAGE,
    REMOVE_SESSION,
    TOGGLE_SIGNUP_PAGE
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    initURL: '',
    authUser: null,
    isUserActive: localStorage.getItem('isUserActive'),
    token: localStorage.getItem('token'),
    isSignUp: false
};
  

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SIGNUP_USER_SUCCESS: {
            return {
              ...state,
              loader: false
            }
          }

        case SIGNIN_USER_SUCCESS: {
            return {
                ...state,
                loader: false,
                authUser: action.payload,
                isUserActive: true
            }
        }
        case ON_SHOW_LOADER: {
            return {
              ...state,
              loader: true
            }
          }
        case ON_HIDE_LOADER: {
            return {
                ...state,
                loader: false
            }
        }
        case HIDE_MESSAGE: {
            return {
                ...state,
                alertMessage: '',
                showMessage: false,
                loader: false
            }
        }
        case SHOW_MESSAGE: {
            return {
              ...state,
              alertMessage: action.payload,
              showMessage: true,
              loader: false
            }
          }
          case REMOVE_SESSION: {
            return {
                ...state,
                isUserActive: false,
                token: null
            }
        }
        case TOGGLE_SIGNUP_PAGE: {
            return {
              ...state,
              isSignUp : action.payload
            }
          }
        default:
            return state;
    }
}