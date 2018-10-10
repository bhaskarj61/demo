import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Store from "./src/Utility/store";
import CreateProfile from "./src/Components/CreateProfile/CreateProfile";
import InterestedIn from "./src/Components/CreateProfile/InterestedIn";
import Experience from "./src/Components/CreateProfile/Experience";
import Summary from "./src/Components/CreateProfile/Summary";
import { Provider } from "mobx-react";
import Profile from "./src/Components/My Profile/Profile";
import Buzz from "./src/Components/Buzz/Buzz";
import AllAttendees from "./src/Components/Connect/AllAttendees";
import Chat from "./src/Components/Connect/Chat";


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
// Chat:{
//   screen:Chat
// },
// AllAttendees:{
//   screen:AllAttendees
// },
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
  }
});
