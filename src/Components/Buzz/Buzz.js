import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";

response = [
  {
    image:
      "http://pbs.twimg.com/profile_images/914895746633129984/6ro7a4ow_normal.jpg",
    text: "twitter post will appear here from twitter api@KelltonTech_Nasscom"
  },
  {
    image:
      "http://pbs.twimg.com/profile_images/914895746633129984/6ro7a4ow_normal.jpg",
    text: "twitter post will appear here from twitter api@KelltonTech_Nasscom"
  },
  {
    image:
      "http://pbs.twimg.com/profile_images/914895746633129984/6ro7a4ow_normal.jpg",
    text: "twitter post will appear here from twitter api@KelltonTech_Nasscom"
  },
  {
    image:
      "http://pbs.twimg.com/profile_images/914895746633129984/6ro7a4ow_normal.jpg",
    text: "twitter post will appear here from twitter api@KelltonTech_Nasscom"
  },
  {
    image:
      "http://pbs.twimg.com/profile_images/914895746633129984/6ro7a4ow_normal.jpg",
    text: "twitter post will appear here from twitter api@KelltonTech_Nasscom"
  },
  {
    image:
      "http://pbs.twimg.com/profile_images/914895746633129984/6ro7a4ow_normal.jpg",
    text: "twitter post will appear here from twitter api@KelltonTech_Nasscom"
  },
  {
    image:
      "http://pbs.twimg.com/profile_images/914895746633129984/6ro7a4ow_normal.jpg",
    text: "twitter post will appear here from twitter api@KelltonTech_Nasscom"
  },
  {
    image:
      "http://pbs.twimg.com/profile_images/914895746633129984/6ro7a4ow_normal.jpg",
    text: "twitter post will appear here from twitter api@KelltonTech_Nasscom"
  }
];
export default class Buzz extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <FlatList
          data={response}
          renderItem={({ item }) => (
            <View
              style={{
                height: 100,
                borderBottomColor: "grey",
                borderBottomWidth: 1,
                flexDirection: "row",
                marginTop: "5%"
              }}
            >
              <View style={{ marginHorizontal: "5%" }}>
                <Image
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                  source={{
                    uri: item.image
                  }}
                />
              </View>
              <View>
                <View>
                  <Text style={{ fontSize: 20 }}>{item.text}</Text>
                </View>
                <View style={{flexDirection:'row',marginBottom:0}}>
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={{
                      uri: item.image
                    }}
                  />
                  <Image
                    style={{ width: 15, height: 15,marginLeft:5 }}
                    source={{
                      uri: item.image
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        />

        <Image
          style={{
            height: 100,
            width: 100,
            position: "absolute",
            bottom: 50,
            right: 20
          }}
          source={require("../../Utility/Images/create_tweet.png")}
        />
      </View>
    );
  }
}
