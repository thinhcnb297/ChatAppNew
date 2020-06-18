import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl, ActivityIndicator
} from 'react-native';
import { Container, Header, Item, Button, Input, Icon, Text } from 'native-base';
import FoIcon from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EnIcon from 'react-native-vector-icons/Entypo'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

const widthDevice = Dimensions.get('window').width
const heightDevice = Dimensions.get('window').height
export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      arrayHolder: [],
      isLoading: false,
      userId: '',

    };
  }
  makeConversation = async (item) => {
    const userReceive = item.id
    const { userId } = this.state
    const query = await firestore().collection('conversation').where('users', 'array-contains', userId).get()
    const dataConversation = []

    for (const doc of query.docs) {
      let fullNameUserSend = ''
      if (doc.data().users[0] == userReceive || doc.data().users[1] == userReceive) {
        const docUser = await firestore().collection('users').doc(userReceive).get();

        fullNameUserSend = docUser.data().fullname;
        
        dataConversation.push({
          ...doc.data(),
          id: doc.id,
          ref: doc.ref
        })
        // Alert.alert('ok') 
        this.props.navigation.navigate('InboxMessageScreen', {
          item: dataConversation[0],
          userId: userId,
          fullNameUserSend: fullNameUserSend
        })
        return
      }
    }
    if (dataConversation == '') {
      this.setState({isLoading:true})
      const users = [userId, userReceive]

      await firestore().collection('conversation').add({
        users: users
      }).then(async queryAddUser => {

        await firestore().collection('conversation').doc(queryAddUser.id).get()
          .then(async doc => {
            console.log("Contacts -> makeConversation -> doc", doc)
            dataConversation.push({
              ref: doc.ref,
              id: doc.id,
            })
            await firestore().collection('users').doc(userReceive).get().then(docUser => {
              this.setState({isLoading:false})
              this.props.navigation.navigate('InboxMessageScreen', {
                item: dataConversation[0],
                userId: userId,
                fullNameUserSend: docUser.data().fullname
              })
            })

          })
      })
    }
    console.log("Contacts -> makeConversation -> dataFindUserSendInArray", dataConversation)

  }

  searchFilterFunction = (text) => {
    const newData = this.state.arrayHolder.filter((item) => {
      const itemData = item.email.toUpperCase() + item.fullname.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    })
    this.setState({ data: newData })
  }

  async getUserId() {
    const userInfoString = await AsyncStorage.getItem('UserInfo')
    const value = JSON.parse(userInfoString)
    console.log("Contacts -> getUserId -> value", value)
    if (value !== null) {
      const query = await firestore().collection('users').where('email', '==', value.username).get()
      console.log("Contacts -> getUserId -> query", query)
      const userId = query.docs[0].id
      await new Promise(resolve => this.setState({ userId: userId }, resolve));
      console.log("Contacts -> getUserId -> userId", userId)
    }
  }

  async getdata() {
    this.setState({ isLoading: true })
    await this.getUserId();
    const query = await firestore().collection('users').get();
    const dataUser = []

    for (const doc of query.docs) {
      if (doc.id !== this.state.userId) {
        dataUser.push({
          ...doc.data(),
          ref: doc.ref,
          id: doc.id

        })
      }
    }
    console.log("Contacts -> getdata -> dataUser", dataUser)
    this.setState({ data: dataUser, arrayHolder: dataUser, isLoading: false })
  }
  componentDidMount() {
    this.getdata();
  }
  renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <View style={styles.contactView}>
          <TouchableOpacity style={styles.contactView} onPress={() => this.makeConversation(item)}>
            <View style={styles.imageAvatarContainer}>
              <Image style={styles.imageAvatar} source={{ uri: item.avatar ? item.avatar : 'https://pickaface.net/gallery/avatar/unr_coder_161217_2144_9om7wj.png' }}></Image>
            </View>
            <View style={styles.informationsContainer}>
              <Text style={styles.informations}>{item.fullname}</Text>
              <Text style={styles.information1}>{item.email}</Text>
            </View>

            {/* </TouchableOpacity> */}
            {/* <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.iconContainer}>
                <Ionicons name='ios-call' size={22} ></Ionicons>
                </TouchableOpacity>
              </View> */}
            <View style={styles.iconContainer}>
              {/* <TouchableOpacity style={styles.iconContainer}> */}
              <Ionicons name='ios-arrow-forward' size={24} color='#95a5a6' ></Ionicons>

            </View>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input onChangeText={text => this.searchFilterFunction(text)} placeholder="Search" />
              <Icon name="ios-people" />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          <View style={{ width: widthDevice, height: 40, backgroundColor: '#3F51B5', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>DANH BẠ</Text>
          </View>
          {/* <View style={styles.titleContainer}>
            <View style={styles.textTitleContainer}>
              <Text style={styles.textTitle}>DANH BA</Text>
            </View>
            <View style={styles.moreIconContainer}>
              <FoIcon name='indent-more' size={24} color='#3F51B5'></FoIcon>
            </View>

          </View> */}
          {this.state.isLoading && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={'large'}></ActivityIndicator>
            </View>
          )}
          {this.state.isLoading == false && (
            <FlatList
              data={this.state.data}
              keyExtractor={(index, item) => item + index.toString()}
              renderItem={this.renderItem}
              refreshControl={
                <RefreshControl refreshing={this.state.isLoading} onRefresh={() => this.getdata()} />
              }
            ></FlatList>
          )}
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    width: widthDevice,
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#ecf0f1'
  },
  textTitleContainer: {
    flex: 1, justifyContent: 'center',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'Lato-Medium',
    fontWeight: '900',
    color: 'black',
    marginLeft: widthDevice / 2 - 40
  },
  moreIconContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contactView: {
    width: widthDevice,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1, borderColor: '#ecf0f1'

  },
  imageAvatarContainer: {
    width: 100, height: 70, justifyContent: 'center', alignItems: 'center'
  },
  imageAvatar: {
    width: 50, height: 50, borderRadius: 25
  },
  informationsContainer: {
    flex: 1, justifyContent: 'center',
  },
  informations: {

    fontSize: 15,
    fontWeight: '900',
    color: 'black',
  },
  information1: {

    fontSize: 12,
    fontWeight: '600',
    color: '#95a5a6',
  },
  iconContainer: {
    width: 80, height: 50, justifyContent: 'center', alignItems: 'center'
  }
})