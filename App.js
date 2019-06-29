/**
 * Name: Chaerus Sulton
 * Email: chaerussulton@gmail.com
 * Project: Health
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar 
} from 'react-native';

import firebase from 'firebase';
import {DB_CONFIG} from './Config';
import Routes from './src/Routes';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    if(!firebase.apps.length){
      firebase.initializeApp(DB_CONFIG);
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
           backgroundColor="#1c313a"
           barStyle="light-content"
         />
        <Routes/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  }
});