import React, { Component,useRef  } from 'react'
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
  Alert,
  Animated
} from 'react-native'
import GradientLine from 'react-native-linear-gradient'
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import * as ActionTypes from '../actions/type';
import * as Animatable from 'react-native-animatable';

const widthDevice = Dimensions.get('window').width
const heightDevice = Dimensions.get('window').height

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
  // fadeIn () {
  //   const fadeAnim = useRef(new Animated.Value(0)).current;
  //   // Will change fadeAnim value to 1 in 5 seconds
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 2000
  //   }).start();
  // };
  onSubmit = async () => {    
    try {
      const { username, password } = this.state;
      if(username === '' || password === ''){
        Alert.alert('Error','Vui lòng nhập Email và Password');
        return false;
      } 
        const user = { username, password };
        this.props.loginAsync(user);     
    } catch (error) {
      Alert.alert('Error',error)
    }
  }
  // componentDidMount(){
  //   this.fadeIn()
  // }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>      
          <ImageBackground
            style={styles.imageBackground}
            source={require('../../../../assets/background.jpg')} >
          <KeyboardAvoidingView behavior='position'  style={{flex: 1}}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../../../../assets/Logo.png')}></Image>
            </View>
            <View style={styles.bodyContainer}>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder="User name"
                  style={styles.textInput}
                  autoCorrect={false}
                  autoCapitalize='none'
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={(text) => this.setState({ username: text })}
                />
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={(c) => this.passwordInput = c}
                  placeholder="Password"
                  secureTextEntry={true}
                  style={styles.textInput}
                  autoCorrect={false}
                  autoCapitalize='none'
                  onSubmitEditing={this.onSubmit}
                  onChangeText={(text) => this.setState({ password: text })}
                />
              </View>
              <Animatable.View 
                animation='bounceInLeft'
                duration={1000}
                // delay={200} 
                style={styles.textInputContainer}>
                <TouchableOpacity
                  onPress={this.onSubmit}
                  style={styles.button}>
                  <GradientLine
                    style={styles.button}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#8E2DE2', '#4A00E0']}>
                    <Text style={styles.textButton}>Login</Text>
                  </GradientLine>
                </TouchableOpacity>
              </Animatable.View>
              <Animatable.View
                animation='bounceInRight'
                duration={1000}
                style={styles.textInputContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')} style={styles.button}>
                  <GradientLine
                    style={styles.button}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#8E2DE2', '#4A00E0']}>
                    <Text style={styles.textButton}>Register</Text>
                  </GradientLine>
                </TouchableOpacity>
              </Animatable.View>
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
    height: 300,
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
    // opacity: fadeAnim
  },
  textInput: {
    width: 350,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Times'
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
  user: state.authReducer.loginReducer.user,
  loading: state.authReducer.loginReducer.loading,
});

// Nối các functions vào props (functions) của View Component
const mapDispatchToProps = (dispatch) => ({
  loginAsync: (user) => dispatch({ type: ActionTypes.LOGIN, user }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

// export default Login;