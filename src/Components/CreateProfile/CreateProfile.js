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
import { observer, inject } from 'mobx-react';
import { FloatingLabelInput } from '../ReusableComponents/FloatingLableInput';
import SubmitButton from '../ReusableComponents/SubmitButton';

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
onSubmit=()=>{
  this.props.store.validateProfile()
  if(this.props.store.isValidated){
    this.props.store.createUserProfile()
    this.props.navigation.navigate("Profile");
  }
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


  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView>
          <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={this.props.store.uploadImage}>
            <Image
              style={styles.profileImageStyle}
              source={this.props.store.avatarSource}
            />  
            </TouchableOpacity>
          </View>

          <View>
            <FloatingLabelInput
              label="First Name*"
              onChangeText={value => {
                  this.props.store.textFirstName= value
              }}
              value={this.props.store.textFirstName}
              style={[
                styles.FloatingLabelInputStyle,
                { borderBottomColor: this.props.store.firstNameBorder }
              ]}
            />
            <Text style={{color:'red'}}>{this.props.store.errorFirstName}</Text>

            <FloatingLabelInput
              label="Last Name*"
              onChangeText={value => {
                  this.props.store.textLastName= value
              }}
              value={this.props.store.textLastName}
              style={[
                styles.FloatingLabelInputStyle,
                { borderBottomColor: this.props.store.lastNameBorder }
              ]}
            />
            <Text style={{color:'red'}}>{this.props.store.errorLastName}</Text>
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
          <View style={{ height: 100, justifyContent: "center" }}>
            <TouchableOpacity onPress={this.onSubmit}>
              <SubmitButton value="Get Started" />
            </TouchableOpacity>
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
