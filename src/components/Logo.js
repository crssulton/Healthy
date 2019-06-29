import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image 
} from 'react-native';

export default class Logo extends Component<{}> {
	render(){
		return(
			<View style={styles.container}>
				<Image style={{width:65, height: 80}}
          			source={require('../images/logo.png')}/>
          		<Text style={styles.logoText}>Welcome to Healthy.</Text>	
  			</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center'
  },
  logoText : {
  	fontSize:18,
  	color:'rgba(255, 255, 255, 0.7)'
  }
});