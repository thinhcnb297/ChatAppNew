import React, { Component, useEffect } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  Platform,
  Alert,
  ActivityIndicator, Animated
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firestore from '@react-native-firebase/firestore';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
// import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
// import database from '@react-native-firebase/database';
import moment from 'moment'
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'

console.disableYellowBox = true



const widthDevices = Dimensions.get('window').width
const heightDevices = Dimensions.get('window').height

export default class inboxMessage extends React.Component {
  flatlist = React.createRef()
  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      typing: false,
      userId: this.props.route.params.userId,
      data: [],
      isLoading: false,
      avatarSource: ''
    }

    // Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
  }
  showActionSheet = () => {
    this.ActionSheet.show()
  }

  getPhotoLibrary = async () => {
    let images = []
    const { item } = this.props.route.params;
    const id = item.id
    const ref = item.ref
    images = await ImagePicker.openPicker({
      includeBase64: true,
      // mediaType: 'photo',
      // waitAnimationEnd: false,
      // includeExif: true,
      compressImageQuality: 0.8,
      maxFiles: 5,
      multiple: true
    })
    images.map(async (item, index) => {
      console.log("inboxMessage -> getPhotoLibrary -> item", item)
      let photoName = new Date().getTime();
      let str = item.path;
      let pieces = str.split(".");
      let typeFile = pieces[pieces.length - 1];
      let fileName = photoName + '.' + typeFile
      const reference = storage().ref('/conversation/' + id + '/' + fileName);
      const pathToFile = str;
      const task = await reference.putFile(pathToFile);
      console.log("inboxMessage -> getPhotoLibrary -> reference", reference)
      // task.on('state_changed', taskSnapshot => {
      //   console.log(`${taskSnapshot.bytesTransferred} transferred out of ${task.totalBytes}`);
      // });
      const url = await storage()
        .ref('/conversation/' + id + '/' + fileName)
        .getDownloadURL();
      console.log("inboxMessage -> getPhotoLibrary -> url", url)
      await ref
        .collection('newMessages')
        .add({
          message: url,
          time: firestore.FieldValue.serverTimestamp(),
          userSend: this.state.userId,
          unread: true,
          checkImage: true
        })
        .then(() => {
          this.scrollEnd = setTimeout(() => this.flatlist.current?.scrollToOffset({ animated: true, offset: 0 }), 50)
        });
    })

  }
  getPhotoCamera = async () => {
    let images = []
    const { item } = this.props.route.params;
    const id = item.id
    const ref = item.ref
    images = await ImagePicker.openCamera({
      includeBase64: true,
      width: 300,
      height: 400,
      // cropping: true,
    })
    console.log("inboxMessage -> getPhotoCamera -> images", images)
      console.log("inboxMessage -> getPhotoLibrary -> item", item)
      let photoName = new Date().getTime();
      let str = images.path;
      let pieces = str.split(".");
      let typeFile = pieces[pieces.length - 1];
      let fileName = photoName + '.' + typeFile
      const reference = storage().ref('/conversation/' + id + '/' + fileName);
      const pathToFile = str;
      const task = await reference.putFile(pathToFile);
      console.log("inboxMessage -> getPhotoLibrary -> reference", reference)
      // task.on('state_changed', taskSnapshot => {
      //   console.log(`${taskSnapshot.bytesTransferred} transferred out of ${task.totalBytes}`);
      // });
      const url = await storage()
        .ref('/conversation/' + id + '/' + fileName)
        .getDownloadURL();
      console.log("inboxMessage -> getPhotoLibrary -> url", url)
      await ref
        .collection('newMessages')
        .add({
          message: url,
          time: firestore.FieldValue.serverTimestamp(),
          userSend: this.state.userId,
          unread: true,
          checkImage: true
        })
        .then(() => {
          this.scrollEnd = setTimeout(() => this.flatlist.current?.scrollToOffset({ animated: true, offset: 0 }), 50)
        });
    
  }


  getMessages = () => {
    const { item } = this.props.route.params;

    // console.log("inboxMessage -> getMessages -> item", item.id)
    try {
      this.setState({ isLoading: true })
      const ref = item.ref.collection('newMessages').orderBy('time', 'desc');

      ref.onSnapshot(onSnapShot => {
        let data = [];
        onSnapShot.forEach((docMessages) => {
          data.push({ ...docMessages.data(), id: docMessages.id })
        })
        // console.log("inboxMessage -> getMessages -> data", data)
        this.setState({ data: data, isLoading: false });
      });
    } catch (error) {
      this.setState({ isLoading: false })
      console.log(error)
    }
  }

  checkMessage(text) {
    // const serverTime = database.ServerValue.TIMESTAMP;
    // console.log(serverTime)
    if (text.length > 0) {

      this.setState({ typing: true, messageText: text })
    }
    else {
      this.setState({ typing: false, messageText: text })

    }
  };
  sendMessage = async () => {

    // Alert.alert('1')
    const { item } = this.props.route.params;
    await item.ref
      .collection('newMessages')
      .add({
        message: this.state.messageText,
        time: firestore.FieldValue.serverTimestamp(),
        userSend: this.state.userId,
        unread: true,
        checkImage: false
      })
      .then(() => {
        this.textInputChat.clear()
        this.setState({ typing: false })
        this.scrollEnd = setTimeout(() => this.flatlist.current?.scrollToOffset({ animated: true, offset: 0 }), 50)
      });
  }

  componentDidMount() {
    this.getMessages();
  }

  // componentWillUnmount() {
  //   this.scrollEnd
  // }

  renderItem = ({ item, index }) => {
    // const timestamp = moment(item.timestamp?.toDate()).format('h:mm A');

    return (
      <View style={{ transform: [{ scaleY: -1 }] }}>
        {/* <View style={styles.timeMessageContainer}>
          <Text style={styles.textTimeMessage}>Yesterday</Text>
        </View> */}
        {/* Receive user UI */}
        {item.userSend !== this.state.userId && (
          <View >
            <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
              <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={require('../../assets/Avatar.png')}></Image>
              </View>
              <View style={styles.messageContainer}>
                {item.checkImage == false && (
                  <View style={styles.messageWrapper}>
                    <Text style={styles.textMessage}>{item.message}</Text>
                    <View style={styles.timeSendContainer}><Text style={styles.timeSend}></Text></View>
                  </View>
                )}
                {item.checkImage  && (
                <View style={styles.messageWrapper}>
                  <Image style={styles.imageMessageSend} source = {{uri:item.message}}></Image>
                  {/* <View style={styles.timeSendContainer}>
                    <Text style={styles.timeSend2}></Text>
                  </View> */}
                </View>
              )}
              </View>
            </View>
            {/* <View style={{marginLeft:60,marginTop:10}}>
                <View style={styles.messageContainer}>      
                  <View style={styles.messageWrapper}>
                  <Text style={styles.textMessage}>{item.message}</Text>
                    <View style={styles.timeSendContainer}><Text style={styles.timeSend}>11:30</Text></View>              
                  </View>   
              </View>
            </View> */}
          </View>
        )}
        {item.userSend === this.state.userId && (
          <View>
            {/* <View style={{flexDirection:'row',justifyContent:'flex-end',paddingTop:15,marginRight:75,marginLeft:20}}>
                <View style={styles.messageSendWrapper}>
                  <Text style={styles.textMessageSend}>{item.message}</Text>
                    <View style={styles.timeSendContainer}>
                      <Text style={styles.timeSend2}>11:30</Text>
                    </View>
                </View> 
                </View>   */}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 15, marginLeft: 65 }}>
              {item.checkImage == false && (
                <View style={styles.messageSendWrapper}>
                  <Text style={styles.textMessageSend}>{item.message}</Text>
                  <View style={styles.timeSendContainer}>
                    <Text style={styles.timeSend2}></Text>
                  </View>
                </View>
              )}
              {item.checkImage  && (
                <View style={styles.messageSendWrapper}>
                  <Image resizeMode='cover' style={styles.imageMessageSend} source = {{uri:item.message}}></Image>
                  {/* <View style={styles.timeSendContainer}>
                    <Text style={styles.timeSend2}></Text>
                  </View> */}
                </View>
              )}
              <View style={styles.avatarContainerSend}>
                <Image style={styles.avatar} source={require('../../assets/Avatar.png')}></Image>
              </View>
            </View>
          </View>
        )}

      </View>
    )
  }
  render() {
    const fullNameUserSend = this.props.route.params.fullNameUserSend
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* <KeyboardAvoidingView behavior = 'position'>       */}
          {/* Header */}
          <View style={styles.headerContainer}>
            <LinearGradient
              style={styles.headerContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#0D80E6', '#2696E7', '#4AB6EB']}
            >
              <View style={styles.headerIconContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <Ionicons
                    name='ios-arrow-back'
                    size={30}
                    color='white'>
                  </Ionicons>
                </TouchableOpacity>
              </View>
              <View style={styles.headerNameUserContainer}>
                <Text style={styles.textHeader}>{fullNameUserSend}</Text>
                <Text style={styles.textHeader2}>Active 1h ago</Text>
              </View>
              <View style={styles.headerIconContainer}>
                <TouchableOpacity>
                  <Feather
                    name='more-vertical'
                    size={30}
                    color='white'>
                  </Feather>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* content */}
          <KeyboardAvoidingView style={styles.content} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            {this.state.isLoading && (
              <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center'
              }}>
                <ActivityIndicator size={'large'}></ActivityIndicator>
              </View>
            )}
            {this.state.isLoading == false && (
              <View style={styles.content}>
                <FlatList
                  ref={this.flatlist}
                  data={this.state.data}
                  keyExtractor={(item, index) => item + index.toString()}
                  renderItem={this.renderItem}
                  style={{ transform: [{ scaleY: -1 }] }}
                />
              </View>
            )}

            {/* keyboard */}

            <View style={styles.keyboardContainer}>
              <View style={styles.cameraIconContainer}>
                <TouchableOpacity onPress={this.showActionSheet}>
                  <Entypo name='camera' size={24} color='#95a5a6'></Entypo>
                  <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Bạn muốn lấy ảnh từ ?'}
                    options={['Chụp từ Camera', 'Chọn từ thư viện', 'Cancel']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={(index) => {
                      if (index === 0) {
                        this.getPhotoCamera()
                      }
                      if (index === 1) {
                        this.getPhotoLibrary()
                      }
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                  ref={(c) => this.textInputChat = c}
                  onChangeText={(text) => this.checkMessage(text)}
                  autoCorrect={false}
                  autoCapital={false}
                  placeholder='Type a message here ....'>
                </TextInput>
              </View>
              <View style={styles.IconRightContainer}>
                <TouchableOpacity>
                  <MaterialIcons name='insert-emoticon' size={24} color='#95a5a6'></MaterialIcons>
                </TouchableOpacity>
              </View>
              <View style={styles.IconRightContainer}>
                <TouchableOpacity>
                  <MaterialIcons name='mic' size={24} color='#95a5a6'></MaterialIcons>
                </TouchableOpacity>
              </View>
              <View style={styles.IconRightContainer}>
                <TouchableOpacity disabled={this.state.typing ? false : true} onPress={this.sendMessage}>
                  <MaterialIcons name='send' size={24} color={this.state.typing ? '#2980b9' : '#95a5a6'}></MaterialIcons>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  headerContainer: {
    width: widthDevices,
    height: 80,
    flexDirection: 'row'
  },
  headerIconContainer: {
    width: 50,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerNameUserContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontFamily: 'Times',
    fontSize: 20,
    color: 'white'
  },
  textHeader2: {
    // paddingTop:10,
    fontFamily: 'Times',
    fontSize: 12,
    color: 'white'
  },
  content: {
    flex: 1
  },
  timeMessageContainer: {
    width: widthDevices,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTimeMessage: {
    color: '#95a5a6',
    fontSize: 13,
    fontFamily: 'Times',
  },
  messageContainer: {
    flexDirection: 'row'
  },
  messageWrapper: {
    marginLeft: 20,
    marginRight: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: 'white'
  },
  messageSendWrapper: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#0D80E6'
  },
  avatarContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  avatar: {
    width: 50, height: 50, borderRadius: 25
  },
  avatarContainerSend: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  textMessage: {
    fontSize: 14,
    color: '#34495e',
    fontFamily: 'Time New Roman',
    padding: 15,
    fontWeight: '500'
  },
  textMessageSend: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Time New Roman',
    padding: 15,
    fontWeight: '500'
  },
  imageMessageSend:{
    padding: 15,
    width:100,
    height:130,
    borderBottomLeftRadius:10, 
    borderTopRightRadius:10, 
    
    
  },
  timeSendContainer: {
    height: 5, marginBottom: 5, justifyContent: 'center', alignItems: 'flex-end'
  },
  timeSend: {
    fontSize: 10, color: '#95a5a6', paddingRight: 15, paddingBottom: 10, paddingLeft: 15
  },
  timeSend2: {
    fontSize: 10, color: 'white', paddingLeft: 10, paddingRight: 15, paddingBottom: 10
  },
  keyboardContainer: {
    width: widthDevices,
    height: 60,
    backgroundColor: 'white', flexDirection: 'row',
  },
  cameraIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  IconRightContainer: {
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 1,
    justifyContent: 'center'
  }
})
