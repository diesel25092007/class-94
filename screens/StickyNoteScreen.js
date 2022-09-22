import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default class StickyNoteScreen extends Component {
 render (){
   return (
     <View style = {styles.container}>
     <Text style = {styles.text}>
     StickyNoteScreen!
     </Text>
     </View>
   )
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
