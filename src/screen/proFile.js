import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'


const { width, height } = Dimensions.get('window')
export default class proFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: true
    }
  }
  signOutHandle = async () => {
    const respone = await AsyncStorage.removeItem('UserInfo')
    auth().signOut().then(() => this.props.navigation.navigate('FlashScreen'));
  }
  render() {
    return (
      <Container>
        <ParallaxScrollView
          backgroundColor="#2c3e50"
          contentBackgroundColor="white"
          parallaxHeaderHeight={300}
          fadeOutForeground={true}
          renderForeground={() => (
            <View style={{ height: 300, width: width, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assets/AvatarBackGround.jpg')}>
              <View style={{ height: 200, width: width, justifyContent: 'center', alignItems: 'center' }}>
                {/* Header avatar */}
                <View style={{ width: width, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <Image style={{ width: 100, height: 100, borderRadius: 50, marginTop: 30 }} source={require('../../assets/Avatar.png')}></Image>
                </View>
                <View style={{ width: width, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>HeLen Kuper</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SimpleLineIcons name='location-pin' size={20} color='white'></SimpleLineIcons>
                    <Text style={{ fontSize: 16, fontWeight: '900', color: 'white' }}>Germany</Text>
                  </View>
                </View>

              </View>
              {/* Button */}
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{flexDirection:'row' ,width: width, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{width:width/2,height:100,justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{flexDirection: 'row',width:width/2-15,height:50,justifyContent: 'center',alignItems: 'center',borderRadius:5,backgroundColor:'#341f97'}}>
                       <FontAwesome5 name='user-plus' size={15} color='white'></FontAwesome5>
                       <Text style={{ paddingLeft:25, fontSize: 16, fontWeight: 'bold', color: 'white' }}>FOLLOW</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{width:width/2,height:100,justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{flexDirection: 'row',width:width/2-15,height:50,justifyContent: 'center',alignItems: 'center',borderRadius:5,backgroundColor:'white'}}>
                       <AntDesign name='message1' size={15} color='#341f97'></AntDesign>
                       <Text style={{ paddingLeft:25, fontSize: 16, fontWeight: 'bold', color: '#341f97' }}>MESSAGE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              </ImageBackground>
            </View>
          )}
          renderContentBackground={() => (
            <View style={{ height: 100, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Hello</Text>
            </View>
          )}
        >
          <View style={{ height: 200 }}>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "#FF9501" }}>
                  <Icon type='Entypo' active name="bell" />
                </Button>
              </Left>
              <Body>
                <Text>Notification</Text>
              </Body>
              <Right>
                <Switch
                  onValueChange={() => this.setState({ switch: !this.state.switch })}
                  value={this.state.switch}
                />
              </Right>
            </ListItem>
          </View>
        </ParallaxScrollView>
      </Container>
    );
  }
}
