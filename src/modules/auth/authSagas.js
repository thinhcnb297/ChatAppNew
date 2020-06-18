import { select, put, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import * as ActionTypes from './actions/type.js';
import { navigationRef } from '../../utils/constants';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// ====================================================================================================================
function* loginAsync(action) {
  try {
    const username = action.user.username;
    const password = action.user.password;
    yield put({ type: ActionTypes.LOGIN_PENDING })
    yield auth().signInWithEmailAndPassword(username, password);
    yield put({ type: ActionTypes.LOGIN_SUCCESS, user: action.user });
    const userJSONString = JSON.stringify(action.user);
    AsyncStorage.setItem('UserInfo', userJSONString);
    navigationRef.current?.navigate('BottomTabNavigator');
  } catch (error) {
    yield put({ type: ActionTypes.LOGIN_ERROR, error })
    let message = '';
    if (error.message.includes('[auth/invalid-email]')) {
      message = 'Email không đúng định dạng';
    }
    if (error.message.includes('[auth/user-not-found]')) {
      message = 'Email người dùng không tồn tại';
    }
    if (error.message.includes('[auth/wrong-password]')) {
      message = 'Mật khẩu không đúng';
    }
    Alert.alert('Error', message)
  }
}

// ====================================================================================================================
function* registerAsync(action) {
  try {
    const email = action.userRegister.userName
    const password = action.userRegister.password
    const fullname = action.userRegister.fullname
    // console.log(email,password,fullname)
    yield put({ type: ActionTypes.REGISTER_PENDING });
    yield auth().createUserWithEmailAndPassword(email, password);
    yield firestore().collection('users').add({
      email: email,
      fullname: fullname,
    });
    yield put({ type: ActionTypes.REGISTER_SUCCESS, userRegister: action.userRegister })
    Alert.alert('Đăng ký thành công', 'Vui lòng đăng nhập')
    navigationRef.current?.navigate('LoginScreen')

  } catch (error) {
    yield put({ type: ActionTypes.REGISTER_ERROR, error })
    let message = '';
    if (error.message.includes('[auth/invalid-email]')) {
      message = 'Email không đúng định dạng';
    }
    if (error.message.includes('[auth/email-already-in-use]')) {
      message = 'Email người dùng đã tồn tại';
    }
    if (error.message.includes('[auth/weak-password]')) {
      message = 'Mật khẩu phải ít nhất 6 ký tự';
    }
    console.log(error)
    Alert.alert('Error', message);
  }
}

// ====================================================================================================================
export default function* authSagas() {
  yield takeLeading(ActionTypes.LOGIN, loginAsync);
  yield takeLeading(ActionTypes.REGISTER, registerAsync)
}
