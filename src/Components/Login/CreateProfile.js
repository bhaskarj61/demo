import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";


import md5 from "react-native-md5";
import ImagePicker from 'react-native-image-picker';

import { observer, inject } from 'mobx-react';
import { FloatingLabelInput } from '../ReusableComponents/FloatingLableInput';
import SubmitButton from '../ReusableComponents/SubmitButton';


const baseUrl ='http://test.kelltontech.net/nasscom_event/'

@inject('store')
@observer
export default class CreateProfile extends Component {

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



  uploadImage = () => {
    var options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // let source = { uri: response.uri };

        // You can also display the image using data:
        let source = { uri: 'data:image/jpeg;base64,' + response.data };
        // this.uploadImageToServer(source);
        alert(JSON.stringify(source))
        this.setState({
          avatarSource: source
        });
      }
    });
  }


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
    if( this.state.textFirstName.length == 0||this.state.textLastName.length == 0){
      this.state.textFirstName.length == 0
      ? this.setState({ firstNameBorder: "red",errorFirstName:"first name required"})
      : this.setState({firstNameBorder: "#555",errorFirstName:""});
    this.state.textLastName.length == 0
      ? this.setState({ lastNameBorder: "red",errorLastName:"last name required" })
      : this.setState({lastNameBorder: "#555",errorLastName:""});
    }
    else{
      this.createUserProfile()
    }
  };

  createUserProfile=async()=>{
      try {
        let response = await fetch(baseUrl + 'edituserprofilesave', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hash: this.state.hash,
            timestamp:this.state.timestamp,
            id:this.state.id,
            firstName:this.state.textFirstName,
            lastName:this.state.textLastName,
            picture: this.state.avatarSource.uri

          }),
        });
        let responseJson = await response.json();
        this.props.store.responseCreateProfile = await responseJson
        this.props.navigation.navigate('Profile')
      } catch (error) {
        alert(error);
      }
  }

  constructor(props){
    super(props)
    this.state = {
      textFirstName: "",
      textLastName: "",
      Summary: "",
      InterestedIn: "",
      Experience: "",
      firstNameBorder: "#555",
      lastNameBorder: "#555",
      errorFirstName:"",
      errorLastName:"",
      avatarSource: require("../../Utility/Images/user_placeholder.png") ,
      hash:"630e24e405889ecdd9cbc5d37345194a",
      timestamp:1538029127,
      id:36081
    };

  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView>
          <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={() => this.uploadImage()}>
            <Image
              style={styles.profileImageStyle}
              source={this.state.avatarSource}
            />  
            </TouchableOpacity>
          </View>

          <View>
            <FloatingLabelInput
              label="First Name*"
              onChangeText={value => {
                this.setState({ textFirstName: value });
              }}
              value={this.state.textFirstName}
              style={[
                styles.FloatingLabelInputStyle,
                { borderBottomColor: this.state.firstNameBorder }
              ]}
            />
            <Text style={{color:'red'}}>{this.state.errorFirstName}</Text>

            <FloatingLabelInput
              label="Last Name*"
              onChangeText={value => {
                this.setState({
                  textLastName: value
                });
              }}
              value={this.state.textLastName}
              style={[
                styles.FloatingLabelInputStyle,
                { borderBottomColor: this.state.lastNameBorder }
              ]}
            />
            <Text style={{color:'red'}}>{this.state.errorLastName}</Text>
          </View>

          <View style={{ marginTop: 40, marginBottom: 20 }}>
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

            <Text style={styles.textStyle}>{this.props.store.summary}</Text>

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

            <Text style={styles.textStyle}>{this.props.store.interestedIn}</Text>

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

            <Text style={styles.textStyle}>{this.props.store.experience}</Text>
          </View>
       

        <View>
          <View style={{ height: 100, justifyContent: "center" }}>
            <TouchableOpacity onPress={this.validateProfile}>
              <SubmitButton value="Get Started" />
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
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
  FloatingLabelInputStyle: {
    fontSize: 20,
    color: "#000",
    borderBottomWidth: 1,
    marginTop: 20,
    borderBottomColor:'#102657'
  },
  editDetailIconStyle: {
    height: 20,
    width: 20,
    marginTop: 10,
    borderColor: "grey"
  }
});
