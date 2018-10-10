import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Switch
} from "react-native";

import md5 from "react-native-md5";
import ImagePicker from "react-native-image-picker";

import { observer, inject } from "mobx-react";
import { AsyncStorage } from "react-native"

const baseUrl = "http://test.kelltontech.net/nasscom_event/";
userDetail = [];
@inject("store")
@observer
export default class Profile extends Component {
  static navigationOptions = {
    title: "My Profile",
    headerStyle: {
      backgroundColor: "#102657"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  uploadImage = () => {
    var options = {
      title: "Select Avatar",
      // customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // let source = { uri: response.uri };

        // You can also display the image using data:
        let source = { uri: "data:image/jpeg;base64," + response.data };
        // this.uploadImageToServer(source);
        alert(JSON.stringify(source));
        this.setState({
          avatarSource: source
        });
      }
    });
  };

  getToken = () => {
    Key1 = "ux19tyiC5Fn0JTLa1l9CIIe03Cw2NsPD";
    Key2 = "vqPvO5H6bMbUhBiOqKT32priQnQrO43k";
    var uts = Math.round(new Date().getTime() / 1000);
    var combine = Key1 + Key2 + uts;
    let hex_md5v = md5.hex_md5(combine);
    console.warn(">>>>hex_md5:", hex_md5v);
    // apiHit(uts,hex_md5v,email);
    console.log(uts + "THIS IS UTS");
    console.log(hex_md5v + "THIS IS hex_md5v");
    // 630e24e405889ecdd9cbc5d37345194a :md5 Hash
    // 1538029127THIS IS UTS
  };

  validateProfile = () => {
    if (
      this.state.textFirstName.length == 0 ||
      this.state.textLastName.length == 0
    ) {
      this.state.textFirstName.length == 0
        ? this.setState({
            firstNameBorder: "red",
            errorFirstName: "first name required"
          })
        : this.setState({ firstNameBorder: "#555", errorFirstName: "" });
      this.state.textLastName.length == 0
        ? this.setState({
            lastNameBorder: "red",
            errorLastName: "last name required"
          })
        : this.setState({ lastNameBorder: "#555", errorLastName: "" });

      this.props.store.authenticateUser();
    } else {
      this.createUserProfile();
    }
  };

  createUserProfile = async () => {
    try {
      let response = await fetch(baseUrl + "edituserprofilesave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          hash: this.state.hash,
          timestamp: this.state.timestamp,
          id: this.state.id,
          firstName: this.state.textFirstName,
          lastName: this.state.textLastName,
          picture: this.state.avatarSource.uri
        })
      });
      let responseJson = await response.json();
    } catch (error) {
      alert(error);
    }
  };

  getUserDetail = async () => {
    try {
      let response = await fetch(
        baseUrl +
          "userprofile?hash=630e24e405889ecdd9cbc5d37345194a&timestamp=1538029127&id=36081",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      let responseJson = await response.json();
      this.userDetail = await responseJson;
      alert(JSON.stringify(this.userDetail))
      this.setState({
        textFirstName: this.userDetail.user_data.firstName,
        textLastName: this.userDetail.user_data.lastName,        
      });
      if(this.userDetail.user_data.commonProfilePic.length>0){
        this.setState({ avatarSource:{uri:this.userDetail.user_data.commonProfilePic}})
      }
 
    } catch (error) {
      alert(error);
    }
  };

  componentWillMount() {
    this.getUserDetail();
  }

  constructor(props) {
    super(props);
    this.state = {
      textFirstName: "",
      textLastName: "",
      Summary: "",
      InterestedIn: "",
      Experience: "",
      firstNameBorder: "#555",
      lastNameBorder: "#555",
      errorFirstName: "",
      errorLastName: "",
      avatarSource: {uri:''},
      hash: "630e24e405889ecdd9cbc5d37345194a",
      timestamp: 1538029127,
      id: 36081
    };
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView>
          {/* default image */}
          <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={() => this.uploadImage()}>
              <Image
                style={styles.profileImageStyle}
                source={this.state.avatarSource}
              />
            </TouchableOpacity>
          </View>

          <View>
            {/* First and last name */}
            <TextInput
              label="First Name*"
              onChangeText={value => {
                this.setState({ textFirstName: value });
              }}
              value={this.state.textFirstName}
              style={[
                styles.TextInputStyle,
                { borderBottomColor: this.state.firstNameBorder }
              ]}
            />
            <Text style={{ color: "red" }}>{this.state.errorFirstName}</Text>

            <TextInput
              label="Last Name*"
              onChangeText={value => {
                this.setState({
                  textLastName: value
                });
              }}
              value={this.state.textLastName}
              style={[
                styles.TextInputStyle,
                { borderBottomColor: this.state.lastNameBorder }
              ]}
            />
            <Text style={{ color: "red" }}>{this.state.errorLastName}</Text>
          </View>

          <View style={{ marginTop: 40, marginBottom: 20 }}>
            {/* profile content summary,experience and interestedIn */}
            <View style={styles.profileContent}>
              <Text style={styles.textStyle}>Summary</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Summary");
                }}
              >
                <Image
                  style={styles.editDetailIconStyle}
                  source={require("../../Utility/Images/editDetail.png")}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.textStyle}>{this.state.Summary}</Text>

            <View style={styles.profileContent}>
              <Text style={styles.textStyle}>Interested In</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("InterestedIn");
                }}
              >
                <Image
                  style={styles.editDetailIconStyle}
                  source={require("../../Utility/Images/editDetail.png")}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.textStyle}>{this.state.InterestedIn}</Text>

            <View style={styles.profileContent}>
              <Text style={styles.textStyle}>Experience</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Experience");
                }}
              >
                <Image
                  style={styles.editDetailIconStyle}
                  source={require("../../Utility/Images/editDetail.png")}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.textStyle}>{this.state.Experience}</Text>

            <View style={styles.profileContent}>
              <Text style={styles.textStyle}>Settings</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View>
            <Text style={{fontSize:20,color:'#000'}}>Allow others to see my participation</Text>
            </View>
              <View>
              <Switch
                onValueChange={this.validateProfile}
                value={this.state.lastName}
              />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={{ height: 100, justifyContent: "center" }}>
          <TouchableOpacity onPress={this.validateProfile}>
            <View style={styles.submitContainer}>
              <Text style={styles.submitText}>
                Update from LinkedIn Profile
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  TextInputStyle: {
    fontSize: 20,
    color: "grey",
    borderBottomWidth: 1,
    marginTop: 20,
    borderBottomColor: "#102657"
  },
  editDetailIconStyle: {
    height: 20,
    width: 20,
    marginTop: 10,
    borderColor: "grey"
  },
  submitContainer: {
    backgroundColor: "#FF9900",
    height: 60,
    borderRadius: 50,
    marginHorizontal: "10%"
  },
  submitText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginTop: 15
  }
});
