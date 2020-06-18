import React, { Component, useState, useEffect } from 'react';
import { Container, Header, Item, Button, Input, Icon, Text } from 'native-base';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
  RefreshControl
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
export default class ChatScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      arrayholder: [],
      isLoading: false,
      userId: '',

    };
  }
  componentDidMount() {
    this.getData();
  }

  async getUserId() {
    const UserInfoString = await AsyncStorage.getItem('UserInfo');
    const UserInfo = JSON.parse(UserInfoString);
    if (UserInfo !== null) {
      // '1' === 1 => false
      // '1' == 1 => true
      const querySnapshot = await firestore()
        .collection("users")
        .where("email", "==", UserInfo.username)
        .get();
      await new Promise(resolve => this.setState({ userId: querySnapshot.docs[0].id }, resolve));
    }
  }

  getData = async () => {
    this.setState({ isLoading: true });

    await this.getUserId();
    try {

      firestore().collection("conversation")
        .where("users", "array-contains", this.state.userId)
        .onSnapshot(({
          next: async conversationSnapshot => {
            const data = [];
          
            for (const doc of conversationSnapshot.docs) {
              const newMessageRef = doc.ref
                .collection('newMessages')
                .orderBy('time', 'desc')
                .limit(1);

              newMessageRef.onSnapshot(newMessageSnapshot => {
             
                if (newMessageSnapshot.empty) return;

                // Destructuring and rename variable name
                const { data: dataState } = this.state;

                const conversationIndex = dataState.findIndex(x => x.id === doc.id);

                if (conversationIndex === -1) return;

                const lastMessage = newMessageSnapshot.docs[0].data().message;
                const checkImageLast = newMessageSnapshot.docs[0].data().checkImage;

                const timeLastMessage = moment(newMessageSnapshot.docs[0].data().time?.toDate()).format('h:mm');

                // console.log("ChatScreen -> getData -> timeLastMessage", timeLastMessage)

                dataState[conversationIndex].lastMessage = lastMessage;
                dataState[conversationIndex].timeLastMessage = timeLastMessage;
                dataState[conversationIndex].checkImageLast = checkImageLast;

                this.setState({ data: dataState,arrayholder: dataState });
              });
              // Lấy data người nhận message 
              const avatarUserSend = '';
              const fullNameUserSend = '';

              for (let i = 0; i < 2; i++) {
                if (doc.data().users[i] != this.state.userId) {
                  
                  await firestore().collection('users').doc(doc.data().users[i]).get().then(docUserAvatar => {
                    
                    avatarUserSend = docUserAvatar.data().avatar
                    fullNameUserSend = docUserAvatar.data().fullname
                  
                  })
                }
              }
              const newMessageSnapshot = await newMessageRef.get();

              
              const lastMessage = newMessageSnapshot?.docs?.[0]?.data?.()?.message ?? null;
              const checkImageLast = newMessageSnapshot?.docs?.[0]?.data?.()?.checkImage ?? null;

              let timeLastMessage = newMessageSnapshot?.docs?.[0]?.data?.()?.time?.toDate?.() ?? null;

              // 0, null, undefined, false
              if (timeLastMessage) {
                timeLastMessage = moment(timeLastMessage).format('h:mm');
              }

              data.push({
                ...doc.data(),
                id: doc.id,
                ref: doc.ref,
                avatarUserSend,
                fullNameUserSend,
                lastMessage,
                timeLastMessage,
                checkImageLast
              });

              // }
            }
            // console.log("ChatScreen -> getData -> response", data)
            this.setState({
              data: data,
              arrayholder: data,
              isLoading: false,
            });
          },
        }));
    } catch (error) {
      console.log("ChatScreen -> getData -> error", error)
      this.setState({ isLoading: false })
    }

  }

  searchFilterFunction = (text) => {
    const newData = this.state.arrayholder.filter(item => {
      const itemData = item.fullNameUserSend.toUpperCase() + item.lastMessage.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ data: newData });
  };

  renderItem = ({ index, item }) => {

    if (!item.lastMessage || !item.timeLastMessage) return null;

    return (

      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() =>
            this.props.navigation.navigate('InboxMessageScreen', {
              userId: this.state.userId,
              fullNameUserSend: item.fullNameUserSend,
              item
            })}>
          <View style={styles.boxContainer}>
            <View style={styles.imageContainer}>
              <Image style={styles.imageAvatar} source={{ uri: item.avatarUserSend ? item.avatarUserSend : 'https://pickaface.net/gallery/avatar/unr_coder_161217_2144_9om7wj.png' }}></Image>
            </View>
            <View style={styles.inforContainer}>
              <Text style={{fontSize: 15,fontWeight: '900',color: 'black',}}>{item.fullNameUserSend}</Text>
              {item.checkImageLast && this.state.userId === item.userSend &&(
                <Text style={{fontSize: 12,fontWeight: '600',color: '#95a5a6',}}>Bạn đã gửi một hình ảnh</Text>
              )}
              {item.checkImageLast && this.state.userId !== item.userSend &&(
                <Text style={{fontSize: 12,fontWeight: '600',color: '#95a5a6',}}>Bạn đã nhận một hình ảnh</Text>
              )}
              {item.checkImageLast == false &&(
                <Text style={{fontSize: 12,fontWeight: '600',color: '#95a5a6',}}>{item.lastMessage}</Text>
              )}
              
            </View>
            <View style={styles.timeContainer}>
              <Text style={{ fontSize: 12, fontWeight: '500', color: '#2980b9' }}>{item.timeLastMessage}</Text>
              {item.countUnread > 0 && (
                <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#2980b9", justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 9 }}>{item.countUnread}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
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

        {this.state.isLoading && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'}></ActivityIndicator>
          </View>
        )}
        {this.state.isLoading == false && (
          <View style={styles.bodyContainer}>
            <FlatList
              data={this.state.data}
              keyExtractor={(index, item) => item + index.toString()}
              renderItem={this.renderItem}
              refreshControl={
                <RefreshControl refreshing={this.state.isLoading} onRefresh={this.getData} />
              }
            />
          </View>
        )}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ecf0f1'
  },
  itemContainer: {
    width: deviceWidth,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxContainer: {
    width: deviceWidth - 10,
    height: 80,
    borderRadius: 5,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80
  },
  imageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  inforContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  timeContainer: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'

  }
})