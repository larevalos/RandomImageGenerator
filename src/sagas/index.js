import {all} from 'redux-saga/effects';
import authSagas from './Auth';
import randomImage from './RandomImage';



export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    randomImage()
  ]);
}
