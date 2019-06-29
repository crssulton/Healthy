/**
 * Name: Chaerus Sulton
 * Email: chaerussulton@gmail.com
 * Project: Health
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import Logo from '../components/Logo';

import {Actions} from 'react-native-router-flux';

export default class Splash extends Component<{}> {

  componentWillMount(){
    setTimeout(() =>{
      Actions.login()
    }, 3000)
  }

	render() {
		return(
      <View style={styles.container}>
        <Logo/>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Healthy Registration.</Text>
        </View>
      </View>	
			)
	}
}
const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },
  contentContainer: {
    paddingVertical: 105,
    backgroundColor:'#455a64',
  },
});