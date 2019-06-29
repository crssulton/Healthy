/**
 * Name: Chaerus Sulton
 * Email: chaerussulton@gmail.com
 * Project: Health
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity ,
  Alert,
  AsyncStorage
} from 'react-native';

import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

export default class FormLogin extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = { 
      nik: '',
      password: '',
    };
    this.submitLogin = this.submitLogin.bind(this)
  }

  submitLogin = async() => {
    const request =  firebase.database().ref(`users/${this.state.nik}`);
    request.on('value', snap => {
      if(snap.exists()){
        var data = snap.val();
        if(data.password === this.state.password) {
          AsyncStorage.setItem('user_nik', this.state.nik);
          AsyncStorage.setItem('user_level', data.level);
          AsyncStorage.setItem('access', '1');
          Alert.alert(
            'Success..!',
            'Login berhasil..',
          );
          if(data.level === '1'){
            setTimeout(() =>{
              Actions.home_pasien()
            }, 1000)
          } else if(data.level === '2'){
            setTimeout(() =>{
              Actions.home_dokter()
            }, 1000)
          }
        } else {
          Alert.alert(
            'Oppss..!',
            'NIK atau Password salah.',
          );
        }
      } else {
        Alert.alert(
          'Oppss..!',
          'Login gagal.',
        );
      }
    });
  }
  
	render(){
		return(
			<View style={styles.container}>
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="NIK"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              keyboardType="default"
              onChangeText={(nik) => this.setState({nik})}
              onSubmitEditing={()=> this.password.focus()}
              />
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = "#ffffff"
              onChangeText={(password) => this.setState({password})}
              ref={(input) => this.password = input}
              />  
           <TouchableOpacity style={styles.button}
            onPress={this.submitLogin}>
             <Text style={styles.buttonText}>{this.props.type}</Text>
           </TouchableOpacity>     
  		</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },

  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
  
});