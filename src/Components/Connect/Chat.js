import React, {Component} from 'react';
import {TouchableOpacity,Animated,StyleSheet,Text,View,ScrollView,ImageBackground,FlatList} from 'react-native';

const BLUE_CHAT = require("../../Utility/Images/blue_chat.png");
const GREY_CHAT = require("../../Utility/Images/grey_chat.png");

export default class Chat extends Component {

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
    <ImageBackground source={GREY_CHAT} style={{resizeMode:'repeat'}}><Text>hywegfwqffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff ddddddddddddddddddddddddddddf</Text></ImageBackground>
    <ImageBackground source={BLUE_CHAT} style={{resizeMode:'repeat'}}><Text>sca</Text></ImageBackground>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
header : {
    flexDirection:"row",
    justifyContent:"space-around",
}
});