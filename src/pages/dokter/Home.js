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

export default class Home extends Component<{}> {
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
      dataPasien: [],
    };
    this.logout = this.logout.bind(this)
    this.submitLogout = this.submitLogout.bind(this)
    this.selesaiPeriksa = this.selesaiPeriksa.bind(this)
    this.submitSelesai = this.submitSelesai.bind(this)
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
      })
      const getData =  firebase.database().ref(`${data.poli}`);
      getData.on('value', snap => {
        var datanya = [];
        snap.forEach(element => {
          var dataq;
          dataq           = element.val()
          dataq['.key']   = element.key;
          datanya.push(dataq);
        });
        this.setState({
          dataPasien: datanya,
        })
      });
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

  selesaiPeriksa(key,nik){
    Alert.alert(
      'Lanjut?',
      'Tekan YES untuk lanjut',
      [
        {text: 'NO', style: 'cancel'},
        {text: 'YES', onPress: () => this.submitSelesai(key,nik)},
      ]
    );
  }

  submitSelesai(key,nik){
    const request =  firebase.database().ref(`users/${nik}`);
    request.on('value', snap => {
      var data = snap.val();
      const request2 =  firebase.database().ref(`users/${nik}`);
      request2.set({
        poli: "",
        nama: data.nama,
        password: data.password,
        nohp: data.nohp,
        level: data.level,
        urutan: 0,
      });
      firebase.database().ref(data.poli).child(key).remove();
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
        <View style={styles.menuPoli}>
          <View style={styles.itemPoli}>
            <Text style={styles.textPoli}>{this.state.poli}</Text>
          </View>
        </View>
        {
          (this.state.dataPasien.length == 0) ? 
          <View style={styles.detailView}>
            <Text style={styles.textPilihan}>Data kosong.</Text>
          </View>
          : null
        }
        {
          this.state.dataPasien.map((data) => {
            return (
              (this.state.dataPasien.length > 0 && data['nik'] !== undefined)?
              <View style={styles.view}>
                <View style={styles.detailPoli}>
                  <Text style={styles.textPoli}>{data['nama']}</Text>
                  <Text style={styles.textKecil}>{`NIK. `+data['nik']}</Text>
                </View>
                <TouchableOpacity style={styles.urutanPoli}
                onPress={() => this.selesaiPeriksa(data['.key'],data['nik'])}>
                  <Text style={styles.textUrutan}>Selesai</Text>
                </TouchableOpacity>
              </View>
              : null
            )
          })
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
    justifyContent :'center',
  },
  itemPoli: {
    width: 300,
    height: 60,
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
    width: 200,
    height: 70,
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
    width: 90,
    height: 40,
    borderWidth: 2,
    borderColor: '#455a64',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent :'center',
    backgroundColor:'#455a64',
  },
  textUrutan: {
    color:'#FFFFFF',
    fontSize: 15,
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