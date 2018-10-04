import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";

import SubmitButton from '../ReusableComponents/SubmitButton';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class InterestedIn extends Component {
  static navigationOptions = {
    title: "Interested In",
    headerStyle: {
      backgroundColor: "#102657"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

      state = {
        countText: 0,
        textInterestedIn: ""
      };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View>
          <TextInput
            style={{ fontSize: 20, textDecorationColor: "grey" }}
            onChangeText={value => {
              this.props.store.interestedIn=value
            }}
            value={this.props.store.interestedIn}
            multiline={true}
            placeholder="Type Something here"
          />
        </View>
        <TouchableOpacity
          style={{ height: 100, justifyContent: "center" }}
          onPress={() => {
            this.props.navigation.navigate('CreateProfile',{interestedIn:this.state.textInterestedIn})
          }}>
          <SubmitButton value="Save" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff"
  }
});
