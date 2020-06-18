import React, { Component } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
export default class Settings extends Component {
  signOutHandle = async () => {
    const respone = await AsyncStorage.removeItem('UserInfo')
    await auth().signOut().then(() => this.props.navigation.navigate('FlashScreen'));
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#303644', '#4A5269']}
            style={styles.headerContainer}>
            <View style={styles.contentHeader}>
              <View style={styles.avatarHeaderContainer}>
                <TouchableOpacity>
                  <Image style={styles.avatarImage} source={require('../../assets/Avatar.png')}></Image>
                </TouchableOpacity>
              </View>
              <View style={styles.informationHeaderContainer}>
                <View style={styles.informationHeader}>
                  <Text style={styles.textInformation}>John Smith</Text>
                  <View style={styles.iconInformation}>
                    <AntDesign name='star' size={24}></AntDesign>
                 
                  </View>
                </View>
                <View style={styles.informationHeader}>
                  <Feather name='more-vertical' size={24} color='white'></Feather>
                  <Text style={styles.textInformation1}>Fraces</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
          {/* <ParallaxScrollView
            windowHeight={deviceHeight * 0.1}
            backgroundSource='http://i.imgur.com/UyjQBkJ.png'
            navBarTitle='John Oliver'
            userName='John Oliver'
            userTitle='Comedian'
            userImage='http://i.imgur.com/RQ1iLOs.jpg'
            leftIcon={{name: 'rocket', color: 'rgba(131, 175, 41, 1)', size: 30, type: 'font-awesome'}}
            rightIcon={{name: 'user', color: 'rgba(193, 193, 193, 1)', size: 30, type: 'font-awesome'}}
          /> */}
        </View>
        {/* ButtonHeader */}
        <View style={styles.headerButtonContainer}>
          <TouchableOpacity style={styles.buttonCall}>
            <FontAwesome5 name='phone-volume' size={24} color='#010101'></FontAwesome5>
            <Text style={styles.textButtonCall}>CALL US</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonMail}>
            <Foundation name='mail' size={24} color='white'></Foundation>
            <Text style={styles.textButtonMail}>MAIL US</Text>
          </TouchableOpacity>
        </View>
        {/* settingContent */}
        <View style={{ flex: 1 }}>
          {/* location */}
          <View style={styles.settingContent}>
            <View style={styles.settingContentIcon}>
              <Entypo name='location' size={24}></Entypo>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.settingContentText}>Location</Text>
            </View>
            <View style={styles.settingContentIcon}>
              <MaterialIcons name='navigate-next' size={24}></MaterialIcons>
            </View>
          </View>
          {/* Restaurant */}
          <View style={styles.settingContent}>
            <View style={styles.settingContentIcon}>
              <MaterialCommunityIcons name='food-fork-drink' size={24}></MaterialCommunityIcons>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.settingContentText}>Restaurant</Text>
            </View>
            <View style={styles.settingContentIcon}>
              <MaterialIcons name='navigate-next' size={24}></MaterialIcons>
            </View>
          </View>
          {/* Shakhand */}
          <View style={styles.settingContent}>
            <View style={styles.settingContentIcon}>
              <FontAwesome5 name='handshake' size={24}></FontAwesome5>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.settingContentText}>Deals</Text>
            </View>
            <View style={styles.settingContentIcon}>
              <MaterialIcons name='navigate-next' size={24}></MaterialIcons>
            </View>
          </View>
          {/* Line */}
          <View style={styles.lineSettingContent}>
            <Text style={{ fontSize: 20, color: '#95a5a6' }}>-------------------------------------------------------------------</Text>
          </View>
          {/* Profile */}
          <View style={styles.settingContent}>
            <View style={styles.settingContentIcon}>
              <FontAwesome name='user' size={24}></FontAwesome>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.settingContentText}>Profile</Text>
            </View>
            <View style={styles.settingContentIcon}>
              <MaterialIcons name='navigate-next' size={24}></MaterialIcons>
            </View>
          </View>
          {/* Address book */}
          <View style={styles.settingContent}>
            <View style={styles.settingContentIcon}>
              <FontAwesome5 name='address-book' size={24}></FontAwesome5>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.settingContentText}>Address book</Text>
            </View>
            <View style={styles.settingContentIcon}>
              <MaterialIcons name='navigate-next' size={24}></MaterialIcons>
            </View>
          </View>
          {/* Address book */}
          <View style={styles.settingContent}>
            <View style={styles.settingContentIcon}>
              <FontAwesome5 name='user-check' size={24}></FontAwesome5>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.settingContentText}>Review</Text>
            </View>
            <View style={styles.settingContentIcon}>
              <MaterialIcons name='navigate-next' size={24}></MaterialIcons>
            </View>
          </View>
          {/* Line */}
          <View style={styles.lineSettingContent}>
            <Text style={{ fontSize: 20, color: '#95a5a6' }}>-------------------------------------------------------------------</Text>
          </View>
          {/* About us*/}
          <View style={styles.settingContent}>
            <View style={styles.settingContentIcon}>
              <Entypo name='info-with-circle' size={24}></Entypo>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.settingContentText}>About Us</Text>
            </View>
            <View style={styles.settingContentIcon}>
              <MaterialIcons name='navigate-next' size={24}></MaterialIcons>
            </View>
          </View>
          <View style={styles.buttonSignOutContainer}>
            <TouchableOpacity onPress={this.signOutHandle} style={styles.buttonSignOut}>
              <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#3F51B5', '#4A00E0']}
                style={styles.buttonSignOut}>
                <Text style={styles.buttonSignOutText}>Sign out</Text>
                <MaterialCommunityIcons name='logout' size={24} color='white'></MaterialCommunityIcons>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: deviceWidth,
    height: 140,
    justifyContent: 'center'
  },
  contentHeader: {
    width: deviceWidth,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  avatarHeaderContainer: {
    width: deviceWidth / 2.5,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  informationHeaderContainer: {
    flex: 1,
    height: 140,
    justifyContent: 'center',

  },
  informationHeader: {
    height: 40,
    flexDirection: 'row', alignItems: 'center'
  },
  textInformation: {
    fontFamily: 'Helvetica Neue',
    fontSize: 23,
    fontWeight: '500',
    color: 'white',
  },
  iconInformation: {
    width: 25, height: 25, borderRadius: 5, backgroundColor: 'white', marginLeft: 10, marginTop: 3
  },
  textInformation1: {
    fontFamily: 'Helvetica Neue',
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  headerButtonContainer: {
    width: deviceWidth, height: 60, flexDirection: 'row',
  },
  buttonCall: {
    width: deviceWidth / 2, 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 60, 
    flexDirection: 'row', 
    backgroundColor: '#F4F4F4'
  },
  textButtonCall: {
    fontFamily: 'Helvetica Neue',
    fontSize: 15,
    fontWeight: '500',
    color: '#34495e',
    paddingLeft: 10
  },
  buttonMail: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: "#FF2021", 
    flexDirection: 'row'
  },
  textButtonMail: {
    fontFamily: 'Helvetica Neue',
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    paddingLeft: 10
  },
  settingContent: {
    width: deviceWidth, height: 45, flexDirection: 'row',
  },
  settingContentIcon: {
    justifyContent: 'center', alignItems: 'center', width: 80, height: 45
  },
  settingContentText: {
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    fontWeight: '500',
    color: '#95a5a6'
  },
  lineSettingContent: {
    width: deviceWidth, height: 10, justifyContent: 'center', alignItems: 'center',
  },
  buttonSignOutContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  buttonSignOut: {
    width: 250, 
    height: 48, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 15, 
    flexDirection: 'row',
  },
  buttonSignOutText: {
    fontFamily: 'Helvetica Neue',
    fontSize: 18,
    fontWeight: '500',
    color: 'white', 
    marginRight: 15
  }
})
