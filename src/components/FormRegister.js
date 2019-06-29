import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  ScrollView,
  Image,
  AsyncStorage,
  Alert,
  TextInput
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';

export default class FormRegister extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = { 
      nik: '',
      nama: '',
      nohp: '',
      password: '',
    };
    this.submitRegister = this.submitRegister.bind(this)
  }
  submitRegister() {
    const request =  firebase.database().ref(`users/${this.state.nik}`);
    request.set({
      poli: "",
      nama: this.state.nama,
      password: this.state.password,
      nohp: this.state.nohp,
      level: "1",
      urutan: 0,
    });
    Alert.alert(
      'Success..!',
      'Register berhasil..',
    );
    setTimeout(() =>{
      Actions.login()
    }, 1000)
  }

	render(){
		return(
			<View style={styles.container}>
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Nama"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              keyboardType="default"
              onChangeText={(nama) => this.setState({nama})}
              />
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="NIK"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              keyboardType="default"
              onChangeText={(nik) => this.setState({nik})}
              />
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Nomor Hp"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              keyboardType="default"
              onChangeText={(nohp) => this.setState({nohp})}
              />
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = "#ffffff"
              onChangeText={(password) => this.setState({password})}
              />  
           <TouchableOpacity style={styles.button}
           onPress={this.submitRegister}>
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
    marginVertical: 5
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
  },
  
});