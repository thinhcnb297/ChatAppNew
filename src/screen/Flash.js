import React, { Component,useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import { View, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';

class Flash extends Component {
  checkUser = async () => {
    let UserInfo = await AsyncStorage.getItem('UserInfo')
    console.log('checkUser', UserInfo)
    if (UserInfo !== null) {
      try {
        const userJSON = JSON.parse(UserInfo);

        const response = await auth().signInWithEmailAndPassword(userJSON.username, userJSON.password);

        this.timeoutHandle = setTimeout(() => {
          this.props.navigation.navigate('BottomTabNavigator')
        }, 1000)
      } catch (error) {
        this.timeoutHandle = setTimeout(() => {
          this.props.navigation.navigate('LoginScreen')
        }, 1000)
      }
    } else {
      this.timeoutHandle = setTimeout(() => {
        this.props.navigation.navigate('LoginScreen')
      }, 1000)
    }
  }

   
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkUser()
    });
    
  }

  componentWillUnmount() {
    this._unsubscribe();
    clearTimeout(this.timeoutHandle);
  }
  render() {
  
    return (
      <LottieView source={require('../../assets/chatFlashScreen.json')} autoPlay loop />
    )
  }
}

export default Flash