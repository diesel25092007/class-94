import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Speech from "expo-speech";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";

let customFonts = {
  "Bubblegum-Sans": require("../assets/BubblegumSans-Regular.ttf")
};

export default class StoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakerColor: "gray",
      speakerIcon: "volume-high-outline",
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {

      });
  };

  async initiateTTS(title, name, note,) {
    const current_color = this.state.speakerColor;
    this.setState({
      speakerColor: current_color === "gray" ? "#ee8249" : "gray"
    });
    if (current_color === "gray") {
      Speech.speak(`${title} by ${name}`);
      Speech.speak(note);
    } else {
      Speech.stop();
    }
  }

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appTitleTextContainer}>
              <Text>
                type note...
              </Text>
            </View>
          </View>
          <View style={styles.storyContainer}>
            <ScrollView>
              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text>
                    {this.props.route.params.note.title}
                  </Text>
                  <Text
                  >
                    {this.props.route.params.note.name}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      this.initiateTTS(
                        this.props.route.params.title,
                        this.props.route.params.name,
                        this.props.route.params.note,
                      )
                    }
                  >
                    <Ionicons
                      name={this.state.speakerIcon}
                      size={RFValue(30)}
                      color={this.state.speakerColor}
                      style={{ margin: RFValue(15) }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.storyTextContainer}>
                <Text
                >
                  {this.props.route.params.note.note}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  storyContainer: {
    flex: 1
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue (20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  iconContainer: {
    flex: 0.2
  },
  storyTextContainer: {
    padding: RFValue(20)
  },

});
