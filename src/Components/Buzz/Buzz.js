import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import LLText from "../ReusableComponents/twitterText";

const RETWEET_IMAGE = require("../../Utility/Images/retweet.png");
const TWEET_IMAGE = require("../../Utility/Images/tweet.png");
const CREATE_TWEET = require("../../Utility/Images/create_tweet.png");
const STAR_IMAGE = require("../../Utility/Images/star.png");
const STAR_FILL_IMAGE = require("../../Utility/Images/star_fill.png");

response = [
  {
    image:
      "http://pbs.twimg.com/profile_images/914895746633129984/6ro7a4ow_normal.jpg",
      text:"HereU2019s your chance to get your question answered by your favourite #NPC2018 speaker! All you need to do is tag yourU2026 https://t.co/57wGqR69BP"
    },
  {
    image:
      "http://pbs.twimg.com/profile_images/914895746633129984/6ro7a4ow_normal.jpg",
      text:"HereU2019s your chance to get your question answered by your favourite #NPC2018 speaker! All you need to do is tag yourU2026 https://t.co/57wGqR69BP"
    },
  {
    image:
      "http://pbs.twimg.com/profile_images/914895746633129984/6ro7a4ow_normal.jpg",
      text:"HereU2019s your chance to get your question answered by your favourite #NPC2018 speaker! All you need to do is tag yourU2026 https://t.co/57wGqR69BP"
    },
  {
    image:
      "http://pbs.twimg.com/profile_images/914895746633129984/6ro7a4ow_normal.jpg",
      text:"HereU2019s your chance to get your question answered by your favourite #NPC2018 speaker! All you need to do is tag yourU2026 https://t.co/57wGqR69BP"
    },
  {
    image:
      "http://pbs.twimg.com/profile_images/914895746633129984/6ro7a4ow_normal.jpg",
      text:"HereU2019s your chance to get your question answered by your favourite #NPC2018 speaker! All you need to do is tag yourU2026 https://t.co/57wGqR69BP"
    },
  {
    image:
      "http://pbs.twimg.com/profile_images/914895746633129984/6ro7a4ow_normal.jpg",
    text:"RT @NASSCOM_Product: HereU2019s your chance to get your question answered by your favourite #NPC2018 speaker!   All you need to do is tag your faU2026"
  },
  {
    image:
      "http://pbs.twimg.com/profile_images/914895746633129984/6ro7a4ow_normal.jpg",
    text:"HereU2019s your chance to get your question answered by your favourite #NPC2018 speaker! All you need to do is tag yourU2026 https://t.co/57wGqR69BP"
  },
  {
    image:
      "http://pbs.twimg.com/profile_images/914895746633129984/6ro7a4ow_normal.jpg",
    text:"HereU2019s your chance to get your question answered by your favourite #NPC2018 speaker! All you need to do is tag yourU2026 https://t.co/57wGqR69BP"
  }
];

export default class Buzz extends Component {
  static navigationOptions = {
    title: "Create My Profile",
    headerStyle: {
      backgroundColor: "#102657"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  changeStarIcon = () => {
    this.state.isStartFill == false
      ? this.setState({ imageStar: STAR_FILL_IMAGE })
      : this.setState({ imageStar: STAR_IMAGE });
    this.state.isStartFill == false
      ? this.setState({ isStartFill: true })
      : this.setState({ isStartFill: false });
  };
  changeTweetIcon = () => {
    this.state.isTweet == false
      ? this.setState({ imageTweet: RETWEET_IMAGE })
      : this.setState({ imageTweet: TWEET_IMAGE });
    this.state.isStartFill == false
      ? this.setState({ isTweet: true })
      : this.setState({ isTweet: false });
  };

  constructor(props) {
    super(props);
    this.state = {
      imageTweet: TWEET_IMAGE,
      imageStar: STAR_IMAGE,
      isTweet: false,
      isStartFill: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={response}
          extraDat={this.state}
          renderItem={({ item }) => (
            <View
              style={{
                height: 150,
                borderBottomColor: "grey",
                borderBottomWidth: 1,
                flexDirection: "row",
                marginTop: "5%"
              }}
            >
              <Image
                style={{
                  width: 50,
                  marginHorizontal: "5%",
                  height: 50,
                  borderRadius: 50
                }}
                source={{
                  uri: item.image
                }}
              />
                <View>
                  <View style={{ maxWidth: "88%" }}>
                    <LLText value={item.text} style={{fontSize:18}} 
                    onTwitterTagPress={(displayword)=>{
                      Linking.openURL('https://about.twitter.com/'+displayword)
                    }}/>  
                  </View>
                <View
                  style={{
                    flexDirection: "row",
                    position: "absolute",
                    bottom: 20
                  }}
                >
                  <TouchableOpacity onPress={this.changeStarIcon}>
                    <Image
                      style={{ width: 20, height: 20}}
                      source={this.state.imageStar}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.changeTweetIcon}>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={this.state.imageTweet}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />

        <Image
          style={{
            height: 80,
            width: 80,
            position: "absolute",
            bottom: 50,
            right: 20
          }}
          source={CREATE_TWEET}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff"
  },
  profileImageContainer: {
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row"
  },
  profileImageStyle: {
    height: 100,
    width: 100,
    borderColor: "grey",
    borderBottomWidth: 1,
    borderRadius: 50
  },
  profileContent: {
    height: 50,
    backgroundColor: "#E8E8E8",
    marginTop: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: 5
  },
  textStyle: {
    fontSize: 20,
    color: "black"
  },
  FloatingLabelInputStyle: {
    fontSize: 20,
    color: "#000",
    borderBottomWidth: 1,
    marginTop: 20,
    borderBottomColor: "#102657"
  },
  editDetailIconStyle: {
    height: 20,
    width: 20,
    marginTop: 10,
    borderColor: "grey"
  }
});
