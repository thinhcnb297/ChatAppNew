import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import { RNCamera, FaceDetector } from 'react-native-camera';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const widthDevice = Dimensions.get('window').width
const heightDevice = Dimensions.get('window').height
export default class Camera extends Component {
 
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={styles.iconClosed}>
              <MaIcon name='close' size={24} color='white'></MaIcon>
            </View>
          </TouchableOpacity>
        </View>

        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />


        <View style={styles.BottomContainer}>
          <View style={styles.BottomImageLibraryContainer}>
            <Image style={{ width: 30, height: 40, borderRadius: 10 }} source={require('../../assets/Avatar.png')}></Image>
          </View>
          <View style={styles.capture}>
            <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
              <MaIcon name='camera-iris' size={40} color='white'></MaIcon>
            </TouchableOpacity>
          </View>
          <View style={styles.scrollCamera}>
            <MaIcon name='camera-retake' size={24} color='white'></MaIcon>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    width: widthDevice,
    height: 50,
    flexDirection: 'row'
  },
  iconClosed: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  BottomContainer: {
    width: widthDevice,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center'
  },
  BottomImageLibraryContainer: {
    width: 70,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  capture: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollCamera: {
    width: 70,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
