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
  ScrollView,
  Image,
  AsyncStorage,
  Alert
} from 'react-native';

import Logo from '../../components/Logo';

import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';

export default class Splash extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = { 
      pilihan: '',
      nik: '',
      nama: '',
      nohp: '',
      password: '',
      poli: '',
      urutan: '',
      jumlahData: 0,
    };
    this.pilihPoli = this.pilihPoli.bind(this)
    this.logout = this.logout.bind(this)
    this.submitLogout = this.submitLogout.bind(this)
  }

  componentWillMount = async() =>{
    const nik = await AsyncStorage.getItem('user_nik')
    this.setState({
      nik: nik,
    })
    const request =  firebase.database().ref(`users/${nik}`);
    request.on('value', snap => {
      var data = snap.val();
      this.setState({
        poli: data.poli,
        nama: data.nama,
        nohp: data.nohp,
        password: data.password,
        level: data.level,
        urutan: data.urutan,
      })
    });
  }

  logout(){
    Alert.alert(
      'Lanjut Logout?',
      'Tekan YES untuk lanjut',
      [
        {text: 'NO', style: 'cancel'},
        {text: 'YES', onPress: () => this.submitLogout()},
      ]
    );
  }

  submitLogout(){
    AsyncStorage.clear();
    Actions.login()
  }

  pilihPoli(){
    const cek =  firebase.database().ref(`${this.state.pilihan}`);
    cek.on('value', snap => {
      if(snap.exists()){
        this.setState({
          jumlahData: snap.numChildren()
        })
      } else {
        this.setState({
          jumlahData: 0
        })
      }
      
    });
    
    const request1 =  firebase.database().ref(`${this.state.pilihan}/${this.state.jumlahData + 1}`);
    request1.set({
      nama: this.state.nama,
      nik: this.state.nik,
    });

    const request2 =  firebase.database().ref(`users/${this.state.nik}`);
    request2.set({
      poli: this.state.pilihan,
      nama: this.state.nama,
      password: this.state.password,
      nohp: this.state.nohp,
      level: this.state.level,
      urutan: this.state.jumlahData + 1,
    });
  }

	render() {
		return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={{width:30, height: 30}}
              source={require('../../images/logo.png')}/>
          <Text style={styles.textHeader}> HEALTHY</Text>
        </View>
        {
          (this.state.poli !== "") ?
          <View>
            <View style={styles.menuPoli}>
              <View style={styles.itemPoli}>
                <Text style={styles.textPoli}>Poli Penyakit Dalam</Text>
              </View>
              <View style={styles.itemPoli}>
                <Text style={styles.textPoli}>Poli Bedah</Text>
              </View>
              <View style={styles.itemPoli}>
                <Text style={styles.textPoli}>Poli Gigi</Text>
              </View>
            </View>
            <View style={styles.menuPoli}>
              <View style={styles.itemPoli}>
                <Text style={styles.textPoli}>Poli Mata</Text>
              </View>
              <View style={styles.itemPoli}>
                <Text style={styles.textPoli}>Poli THT</Text>
              </View>
              <View style={styles.itemPoli}>
                <Text style={styles.textPoli}>Poli Anak</Text>
              </View>
            </View>
          </View>
          :
          <View>
            <View style={styles.menuPoli}>
              <TouchableOpacity style={styles.itemPoli}
              onPress={() => this.setState({ pilihan: 'Poli Penyakit Dalam' })}>
                <Text style={styles.textPoli}>Poli Penyakit Dalam</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemPoli}
              onPress={() => this.setState({ pilihan: 'Poli Bedah' })}>
                <Text style={styles.textPoli}>Poli Bedah</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemPoli}
              onPress={() => this.setState({ pilihan: 'Poli Gigi' })}>
                <Text style={styles.textPoli}>Poli Gigi</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuPoli}>
              <TouchableOpacity style={styles.itemPoli}
              onPress={() => this.setState({ pilihan: 'Poli Mata' })}>
                <Text style={styles.textPoli}>Poli Mata</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemPoli}
              onPress={() => this.setState({ pilihan: 'Poli THT' })}>
                <Text style={styles.textPoli}>Poli THT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemPoli}
              onPress={() => this.setState({ pilihan: 'Poli Anak' })}>
                <Text style={styles.textPoli}>Poli Anak</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        
        {
          ((this.state.poli === "") && (this.state.pilihan === "")) ? 
          <View style={styles.detailView}>
            <Text style={styles.textPilihan}>Silahkan Memilih Poli Tujuan Anda</Text>
          </View>
          : 
          ((this.state.poli !== "")) ?
          <View style={styles.view}>
            <View style={styles.detailPoli}>
              <Text style={styles.textPoli}>{this.state.poli}</Text>
              <Text style={styles.textKecil}>Pilihan</Text>
            </View>
            <View style={styles.urutanPoli}>
              <Text style={styles.textUrutan}>{this.state.urutan}</Text>
              <Text style={styles.textKecil}>Urutan</Text>
            </View>
          </View>
          :
          <View style={styles.view}>
            <View style={styles.detailPoli}>
              <Text style={styles.textPoli}>{this.state.pilihan}</Text>
            </View>
            <View style={styles.actionPoli}>
              <TouchableOpacity style={styles.daftarPoli}
              onPress={this.pilihPoli}>
                <Text style={styles.textDaftar}>Daftar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.batalPoli}
              onPress={() => this.setState({ pilihan: '' })}>
                <Text style={styles.textBatal}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        }

        <View style={styles.signupTextCont}>
          <TouchableOpacity style={styles.menu}>
            <Image style={{width:25, height: 25}}
              source={require('../../images/home.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menu}
          onPress={this.logout}>
            <Image style={{width:23, height: 23}}
                source={require('../../images/logout.png')}/>
          </TouchableOpacity>
        </View>
        
      </View>	
			)
	}
}
const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
  signupTextCont : {
    height: 54,
    backgroundColor:'#455a64',
    paddingVertical:16,
    flexDirection:'row',
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  view: {
    flex: 1,
    backgroundColor:'#ffffff',
    justifyContent :'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#455a64',
    flexDirection:'row',
    padding: 30,
  },
  detailView: {
    flex: 1,
    backgroundColor:'#ffffff',
    justifyContent :'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#455a64',
    flexDirection:'row',
    padding: 30,
  },
  menu: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    height: 54,
    backgroundColor:'#455a64',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  textHeader: {
    color:'rgb(255,255,255)',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuPoli: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 18,
    justifyContent :'space-between',
  },
  itemPoli: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#455a64',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent :'center',
  },
  textPoli: {
    color:'#455a64',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center'
  },
  textPilihan: {
    color:'#455a64',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center'
  },
  daftarPoli: {
    width: 120,
    height: 40,
    borderRadius: 18,
    backgroundColor:'#455a64',
    alignItems: 'center',
    justifyContent :'center',
  },
  batalPoli: {
    marginTop:10,
    width: 120,
    height: 40,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#455a64',
    alignItems: 'center',
    justifyContent :'center',
  },
  detailPoli: {
    width: 160,
    height: 130,
    borderWidth: 2,
    borderColor: '#455a64',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent :'center',
  },
  textDaftar: {
    color:'#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center'
  },
  textBatal: {
    color:'#455a64',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center'
  },
  actionPoli: {
    paddingHorizontal:16,
  },
  urutanPoli: {
    width: 120,
    height: 90,
    borderWidth: 2,
    borderColor: '#455a64',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent :'center',
  },
  textUrutan: {
    color:'#455a64',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center'
  },
  textKecil: {
    color:'#455a64',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});