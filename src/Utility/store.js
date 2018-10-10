import { observable, action } from "mobx";
import ImagePicker from "react-native-image-picker";
const baseUrl ='http://test.kelltontech.net/nasscom_event/'
import React, { Component } from "react";

class Store {
  @observable responseCreateProfile = [];
  @observable summary = "";
  @observable experience = "";
  @observable interstedIn = "";
  @observable avatarSource = require("../Utility/Images/user_placeholder.png");
  @observable firstNameBorder = "#555";
  @observable lastNameBorder = "#555";
  @observable errorFirstName = "";
  @observable errorLastName = ""
  @observable textFirstName=""
  @observable textLastName=""
  @observable isValidated=false
  @observable attendeesDetail={}
  @action
  uploadImage = () => {
    var options = {
      title: "Select Avatar",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

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
        this.avatarSource = source;
      }
    });
  };

  //checking for empty fields while updating profile

  validateProfile = () => {
    if (this.textFirstName.length == 0 ||  this.textLastName.length == 0) {
      if (this.textFirstName.length == 0) 
      {
        this.firstNameBorder = "red";
        this.errorFirstName = "first name required";
      } else {
        this.firstNameBorder = "#555";
        this.errorFirstName = "";
      }
      if (this.textLastName.length == 0) {
        this.lastNameBorder = "red";
        this.errorLastName = "first name required";
      } else {
        this.lastNameBorder = "#555";
        this.errorLastName = "";
      }
    } 
    else {
        this.isValidated=true
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
          hash:'630e24e405889ecdd9cbc5d37345194a',
          timestamp: 1538029127,
          id: 36081,
          firstName: this.textFirstName,
          lastName: this.textLastName,
          picture: this.avatarSource.uri,
          whoAmI: this.summary,
          lookingFor: this.interestedIn,
          experience: this.experience
        })
      });
      this.isValidated=false
    } catch (error) {
      alert(error);
    }
  };

  getAttendees = async () => {
    try {
      let response = await fetch(
        baseUrl +"getattendees?hash=6c91c1dad3e11fa35e0aa8a97f7fdb8c&timestamp=1537957868&eventId=22925",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      let responseJson = await response.json();
      this.attendeesDetail = await responseJson;
      alert(JSON.stringify(this.attendeesDetail))
    } catch (error) {
      alert(error);
    }
  };
}

export default Store;
