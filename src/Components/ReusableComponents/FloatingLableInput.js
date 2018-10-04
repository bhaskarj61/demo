import React, { Component } from "react";
import { TextInput, View, Text } from "react-native";

export class FloatingLabelInput extends Component {
  state = {
    isFocused: false
  };
  
  render() {
    const { value,label, ...props } = this.props;
    const { isFocused } = this.state;
    const labelStyle = {
      position: "absolute",
      left: 0,
      top: !isFocused ? 18 : 0,
      fontSize: !isFocused ? 20 : 14,
      color: !isFocused ? "#000" : "#102657"
    };
    return (
      <View style={{ paddingTop: 10 }}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput
          {...props}
          
          onBlur={() => {
            if (this.props.value !== '') {
              this.setState({ isFocused: true });
            } else {
              this.setState({ isFocused: false });
            }
          }}
          onFocus={() => {
            if (this.props.value !== '') {
             
              this.setState({ isFocused: false });
            }
            else{
              this.setState({ isFocused: true });
            }
          }}
        >
          {this.props.value}
        </TextInput>
      </View>
    );
  }
}
