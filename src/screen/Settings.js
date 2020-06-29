<<<<<<< HEAD
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
  Switch,
  Input
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import GradientLine from 'react-native-linear-gradient'


const { width, height } = Dimensions.get('window')
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: true
    }
  }
  signOutHandle = async () => {
    const respone = await AsyncStorage.removeItem('UserInfo')
    await auth().signOut().then(() => this.props.navigation.navigate('FlashScreen'));
  }
  render() {
    return (
      <Container>
        <ParallaxScrollView
          backgroundColor="black"
          contentBackgroundColor="white"
          parallaxHeaderHeight={300}
          renderForeground={() => (
            <View style={{ height: 300, width: width, alignItems: 'center' }}>
              <Image style={{ width: '100%', height: '100%', opacity: 0.5 }} source={require('../../assets/AvatarBackGround.jpg')}>
              </Image>
              <View style={{ position: 'absolute', height: 200, width: width, justifyContent: 'center', alignItems: 'center' }}>
                {/* Header avatar */}
                <View style={{ width: width, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <Image style={{ width: 100, height: 100, borderRadius: 50, marginTop: 30 }} source={require('../../assets/avatar1.jpg')}></Image>
                </View>
                <View style={{ width: width, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>HeLen Kuper</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center',padingTop:5 }}>
                    <SimpleLineIcons name='location-pin' size={20} color='white'></SimpleLineIcons>
                    <Text style={{ fontSize: 16, fontWeight: '900', color: 'white' }}>Germany</Text>
                  </View>
                </View>

              </View>
              {/* Button */}
              <View style={{ position: 'absolute', bottom: 10, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: width, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ width: width / 2, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', width: width / 2 - 15, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#341f97' }}>
                      <MaterialCommunityIcons name='update' size={20} color='white'></MaterialCommunityIcons>
                      <Text style={{ paddingLeft: 15, fontSize: 15, fontWeight: 'bold', color: 'white' }}>UPDATE PROFILE</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: width / 2, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', width: width / 2 - 15, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: 'white' }}>
                      <AntDesign name='message1' size={15} color='#341f97'></AntDesign>
                      <Text style={{ paddingLeft: 25, fontSize: 15, fontWeight: 'bold', color: '#341f97' }}>MESSAGE US</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
          renderContentBackground={() => (
            <View>
              <View style={{ height: 50, width: width, alignItems: 'center', justifyContent: 'center' }}>
                <GradientLine
                  style={{ height: 50, width: width, alignItems: 'center', justifyContent: 'center' }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={['#3E328F', '#4E2F8B', '#8B1D7C', '#B2216F', '#891849']}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>SETTINGS</Text>
                </GradientLine>
              </View>
              <View>
                <ListItem icon>
                  <Left>
                    <Button style={{ backgroundColor: "#e74c3c" }}>
                      <Icon type='FontAwesome5' active name="lock" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>Quyền riêng tư</Text>
                  </Body>
                  <Right>
                    <Icon name="ios-arrow-forward" type='Ionicons' />
                  </Right>
                </ListItem>

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

                <ListItem icon>
                  <Left>
                    <Button style={{ backgroundColor: "#8B1D7C" }}>
                      <Icon type='FontAwesome5' active name="user-lock" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>Đổi mật khẩu</Text>
                  </Body>
                  <Right>
                    <Icon name="ios-arrow-forward" type='Ionicons' />
                  </Right>
                </ListItem>

                <ListItem onPress={this.signOutHandle} icon>
                  <Left>
                    <Button style={{ backgroundColor: "#27ae60" }}>
                      <Icon type='MaterialCommunityIcons' active name="logout" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>Đăng xuất</Text>
                  </Body>
                </ListItem>


              </View>
            </View>
          )}

        ></ParallaxScrollView>

      </Container>

    );
  }
}
=======
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
  Switch,
  Input
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import GradientLine from 'react-native-linear-gradient'


const { width, height } = Dimensions.get('window')
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: true
    }
  }
  signOutHandle = async () => {
    const respone = await AsyncStorage.removeItem('UserInfo')
    await auth().signOut().then(() => this.props.navigation.navigate('FlashScreen'));
  }
  render() {
    return (
      <Container>
        <ParallaxScrollView
          backgroundColor="black"
          contentBackgroundColor="white"
          parallaxHeaderHeight={300}
          renderForeground={() => (
            <View style={{ height: 300, width: width, alignItems: 'center' }}>
              <Image style={{ width: '100%', height: '100%', opacity: 0.5 }} source={require('../../assets/AvatarBackGround.jpg')}>
              </Image>
              <View style={{ position: 'absolute', height: 200, width: width, justifyContent: 'center', alignItems: 'center' }}>
                {/* Header avatar */}
                <View style={{ width: width, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <Image style={{ width: 100, height: 100, borderRadius: 50, marginTop: 30 }} source={require('../../assets/avatar1.jpg')}></Image>
                </View>
                <View style={{ width: width, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>HeLen Kuper</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center',padingTop:5 }}>
                    <SimpleLineIcons name='location-pin' size={20} color='white'></SimpleLineIcons>
                    <Text style={{ fontSize: 16, fontWeight: '900', color: 'white' }}>Germany</Text>
                  </View>
                </View>

              </View>
              {/* Button */}
              <View style={{ position: 'absolute', bottom: 10, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: width, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ width: width / 2, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', width: width / 2 - 15, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#341f97' }}>
                      <MaterialCommunityIcons name='update' size={20} color='white'></MaterialCommunityIcons>
                      <Text style={{ paddingLeft: 15, fontSize: 16, fontWeight: 'bold', color: 'white' }}>UPDATE PROFILE</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: width / 2, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', width: width / 2 - 15, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: 'white' }}>
                      <AntDesign name='message1' size={15} color='#341f97'></AntDesign>
                      <Text style={{ paddingLeft: 25, fontSize: 16, fontWeight: 'bold', color: '#341f97' }}>MESSAGE US</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
          renderContentBackground={() => (
            <View>
              <View style={{ height: 50, width: width, alignItems: 'center', justifyContent: 'center' }}>
                <GradientLine
                  style={{ height: 50, width: width, alignItems: 'center', justifyContent: 'center' }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={['#3E328F', '#4E2F8B', '#8B1D7C', '#B2216F', '#891849']}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>SETTINGS</Text>
                </GradientLine>
              </View>
              <View>
                <ListItem icon>
                  <Left>
                    <Button style={{ backgroundColor: "#e74c3c" }}>
                      <Icon type='FontAwesome5' active name="lock" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>Quyền riêng tư</Text>
                  </Body>
                  <Right>
                    <Icon name="ios-arrow-forward" type='Ionicons' />
                  </Right>
                </ListItem>

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

                <ListItem icon>
                  <Left>
                    <Button style={{ backgroundColor: "#8B1D7C" }}>
                      <Icon type='FontAwesome5' active name="user-lock" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>Đổi mật khẩu</Text>
                  </Body>
                  <Right>
                    <Icon name="ios-arrow-forward" type='Ionicons' />
                  </Right>
                </ListItem>

                <ListItem onPress={this.signOutHandle} icon>
                  <Left>
                    <Button style={{ backgroundColor: "#27ae60" }}>
                      <Icon type='MaterialCommunityIcons' active name="logout" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>Đăng xuất</Text>
                  </Body>
                </ListItem>


              </View>
            </View>
          )}

        ></ParallaxScrollView>

      </Container>

    );
  }
}
>>>>>>> a52889e1ffcb5f1c6155e3c121e7051e9e0660f4
