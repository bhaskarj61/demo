import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class SubmitButton extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <View style={styles.submitContainer}>
        <Text style={styles.submitText}>{this.props.value}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  submitContainer: {
    backgroundColor: "#FF9900",
    height: 60,
    marginHorizontal: "30%",
    borderRadius: 50
  },
  submitText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginTop: 15
  }
});
