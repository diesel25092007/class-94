import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {StatusBar} from "expo-status-bar"
import HomeScreen from "./screens/HomeScreen";
import StickyNoteScreen from "./screens/StickyNoteScreen";
import CreateNoteScreen from "./screens/CreatNoteScreen";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from "firebase";
import { firebaseConfig } from "./Config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StickyNotes" component={StickyNoteScreen} />
        <Stack.Screen name="CreateNote" component={CreateNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;