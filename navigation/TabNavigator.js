import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import StickyNoteScreen from "../screens/StickyNoteScreen";
import CreateNote from "../screens/CreatNoteScreen";
import firebase from "firebase";

const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  constructor(props) {
    super(props);
  }

  renderStickyNote = props => {
    return <StickyNoteScreen setUpdateToFalse={this.removeUpdated} {...props} />;
  };

  renderCreateNote = props => {
    return <CreateNote setUpdateToTrue={this.changeUpdated} {...props} />;
  };

  changeUpdated = () => {
    this.setState({ isUpdated: true });
  };

  removeUpdated = () => {
    this.setState({ isUpdated: false });
  };

  componentDidMount() {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function(snapshot) {
        theme = snapshot.val().current_theme;
      });
  }

  render() {
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={
          this.state.light_theme
            ? styles.bottomTabStyleLight
            : styles.bottomTabStyle
        }
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "StickyNote") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "CreateNote") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            }
            return (
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={styles.icons}
              />
            );
          }
        })}
        activeColor={"#ee8249"}
        inactiveColor={"gray"}
      >
        <Tab.Screen
          name="StickyNote"
          component={this.renderStickyNote}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="CreateNote"
          component={this.renderCreateNote}
          options={{ unmountOnBlur: true }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  bottomTabStyleLight: {
    backgroundColor: "#eaeaea",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});
