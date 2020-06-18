import { all, fork } from 'redux-saga/effects';
import authSagas from './modules/auth/authSagas';

export default function* rootSagas() {
  yield all([fork(authSagas)]);
}