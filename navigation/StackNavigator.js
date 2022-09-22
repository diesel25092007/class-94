import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import ReadNoteScreen from "../screens/ReadNoteScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="ReadNoteScreen" component={ReadNoteScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
