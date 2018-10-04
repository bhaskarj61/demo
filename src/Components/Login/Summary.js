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
export default class Summary extends Component {
  static navigationOptions = {
    title: "Summary",
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
    textSummary: ""
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View>
          <TextInput
            style={{ fontSize: 20, textDecorationColor: "grey" }}
            onChangeText={value => {
              this.props.store.summary=value
            }}
            value={this.props.store.summary}
            multiline={true}
            placeholder="Type Something here"
          />
        </View>

        <TouchableOpacity
          style={{ height: 100, justifyContent: "center" }}
          onPress={() => {
            this.props.navigation.navigate('CreateProfile')
          }}
        >
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
