import React, { Component } from 'react'
import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native'
import GradientLine from 'react-native-linear-gradient'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux';

import * as ActionTypes from '../actions/type';

const widthDevice = Dimensions.get('window').width
const heightDevice = Dimensions.get('window').height
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      userName: '',
      password: '',
      confirmPassword: ''
    }
  }
  registerHandler = () => {
    const { userName, password, confirmPassword, fullname } = this.state
    if (userName.length === 0 || password.length === 0) {
      Alert.alert('Error', 'Vui lòng nhập các trường')
      return
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Mật khẩu không khớp')
      return
    }
    const userRegister = { userName, password, fullname }
    this.props.registerAsync(userRegister)
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <ImageBackground
            style={styles.imageBackground}
            source={require('../../../../assets/background.jpg')} >
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../../../../assets/Logo.png')}></Image>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.bodyContainer}>
              <View style={styles.bodyContainer}>
                <View style={styles.textInputContainer}>
                  <TextInput
                    onChangeText={(text) => this.setState({ fullname: text })}
                    placeholder="Full Name"
                    style={styles.textInput}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onSubmitEditing={() => this.userNameInput.focus()}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    ref={c => this.userNameInput = c}
                    onChangeText={(text) => this.setState({ userName: text })}
                    placeholder="Email"
                    keyboardType="email-address"
                    style={styles.textInput}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onSubmitEditing={() => this.passwordInput.focus()}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    ref={(c) => this.passwordInput = c}
                    onChangeText={(text) => this.setState({ password: text })}
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.textInput}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onSubmitEditing={() => this.passwordConfirmInput.focus()}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    ref={(c) => this.passwordConfirmInput = c}
                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    style={styles.textInput}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onSubmitEditing={this.registerHandler}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <TouchableOpacity onPress={this.registerHandler} style={styles.button}>
                    <GradientLine
                      style={styles.button}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      colors={['#8E2DE2', '#4A00E0']}>
                      <Text style={styles.textButton}>Register</Text>
                    </GradientLine>
                  </TouchableOpacity>
                </View>

                <View style={styles.textInputContainer}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('LoginScreen')}
                    style={styles.button}>
                    <GradientLine
                      style={styles.button}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      colors={['#8E2DE2', '#4A00E0']}>
                      <Text style={styles.textButton}>Move to Login</Text>
                    </GradientLine>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </SafeAreaView>
      </TouchableWithoutFeedback>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: widthDevice,
    height: heightDevice
  },
  logoContainer: {
    width: widthDevice,
    height: 230,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    borderRadius: 100,
    width: 200,
    height: 200
  },
  bodyContainer: {
    flex: 1,
  },
  textInputContainer: {
    width: widthDevice,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textInput: {
    width: 350,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Lato-Bold',

  },
  button: {
    width: 350,
    height: 50,
    borderRadius: 10,

    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Times'
  }

})

const mapStateToProps = (state) => ({
  loading: state.authReducer.registerReducer.loading,
  userRegister: state.authReducer.registerReducer.userRegister
})
const mapDispatchToProps = (dispatch) => ({
  registerAsync: (userRegister) => dispatch({ type: ActionTypes.REGISTER, userRegister })
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);