import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {
  AsyncStorage
} from 'react-native';

import Splash from './pages/Splash';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home_pasien from './pages/pasien/Home';
import Home_dokter from './pages/dokter/Home';

export default class Routes extends Component<{}> {
	constructor(props) {
    super(props);
    this.state = {
      role : 0
    };
  }
	componentWillMount = async() =>{
		try {
			const access = await AsyncStorage.getItem('access')
			const user_level = await AsyncStorage.getItem('user_level')
			if(access === '0'){
				this.setState({role : 0})
			}  
			if((access === '1') && (user_level === '1')){
				this.setState({role : 1})
			}
			if((access === '1') && (user_level === '2')){
				this.setState({role : 2})
			}
		} catch (error) {console.log('error router')}
	}
	render() { 
    let content = null
		if (this.state.role === 0) {
      content =
				<Stack key="root" hideNavBar={true}>
					<Scene key="splash" component={Splash} title="Splash" initial={true}/>
					<Scene key="login" component={Login} title="Login"/>
					<Scene key="signup" component={Signup} title="Register"/>
					<Scene key="home_pasien" component={Home_pasien} title="Home"/>
					<Scene key="home_dokter" component={Home_dokter} title="Home"/>
				</Stack>
    } else if (this.state.role === 1){
			content =
				<Stack key="root" hideNavBar={true}>
					<Scene key="home_pasien" component={Home_pasien} title="Home" initial={true}/>
				</Stack>
		} else if (this.state.role === 2){
			content =
				<Stack key="root" hideNavBar={true}>
					<Scene key="home_dokter" component={Home_dokter} title="Home" initial={true}/>
				</Stack>
		}
		return(
			<Router>
			    {content}
			 </Router>
			)
	}
}