import BottomSheet from 'reanimated-bottom-sheet'
import {View} from 'react-native'
import React,{Component} from 'react'
export default class Example extends React.Component {
//   renderContent = () => (
//     /* render */
//   )

//   renderHeader = () => (
//     /* render */
//   )

  render() {
    return (
      <View style={styles.container}>
        <BottomSheet
          snapPoints = {[450, 300, 0]}
          renderContent = {this.renderContent}
          renderHeader = {this.renderHeader}
        />
    </View>)
  }
}