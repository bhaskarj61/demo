import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Store from "./src/Utility/store";
import CreateProfile from "./src/Components/Login/CreateProfile";
import InterestedIn from "./src/Components/Login/InterestedIn";
import Experience from "./src/Components/Login/Experience";
import Summary from "./src/Components/Login/Summary";
import { Provider } from "mobx-react";
import Profile from "./src/Components/My Profile/Profile";
import Buzz from "./src/Components/Buzz/Buzz";

const store = new Store();

const stores = {
  store
};

export default class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <AppStackNavigator />
      </Provider>
    );
  }
}

const AppStackNavigator = createStackNavigator({
  Buzz:{
    screen:Buzz
  },
  CreateProfile: {
    screen: CreateProfile
  },
  Profile:{
    screen:Profile
  },
  Summary: {
    screen: Summary
  },
  InterestedIn: {
    screen: InterestedIn
  },
  Experience: {
    screen: Experience
  },
  Buzz:{
    screen:Buzz
  }
});
