import React, { Component } from 'react';
import { StatusBar, 
         StyleSheet, 
         Text, 
         View, 
         ToolbarAndroid,
         TextInput, 
         ScrollView, 
         TouchableOpacity, 
         Alert, Image, Button,
         DrawerLayoutAndroid,
         AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux'; 
import { firebaseApp } from './FirebaseConfig.js';

export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:'',
      userId: '',
      //userId: '',
    }
  }

saveLoginCredentials(){
    AsyncStorage.setItem("userId", firebaseApp.auth().currentUser.uid);
      this.setState({
        email:'',
        password:''
      });
    Actions.tabbar();
}

componentDidMount(){
    AsyncStorage.getItem("userId").then((value) => {
        this.setState({userId: value});
     }).done();
    if(this.state.userId!="nothing"){
      Actions.register();
    }
}

  login(){
    alert(this.state.userId+'nothing');
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
          Alert.alert(
              'Alert Title',
              'logged email: '+this.state.email,
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => this.saveLoginCredentials()},
              ],
              { cancelable: false }
          )
    })
    .catch(function(error) {
          Alert.alert(
              'Alert Title',
              'logged email: '+this.state.email,
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => Actions.tabbar()},
              ],
              { cancelable: false }
          )
    });

  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style = { styles.container } >
        <StatusBar 
            backgroundColor='#018ea0'
          />
          <ToolbarAndroid
          style = {styles.toolbar}
          title="SayMoney"
          />
          <View style={styles.header}>
            <Text style={styles.headerText}>Login</Text>
          </View>
      <TextInput style={styles.inputText}
          placeholder="Email"
          onChangeText = {(email) => this.setState({email})}
          value={this.state.email}
      />
      <TextInput style={styles.inputText}
          onChangeText = {(password) => this.setState({password})}
          secureTextEntry = {true}
          value={this.state.password}
          placeholder="Password"

      />
      
      <View style={styles.buttons} >
        <TouchableOpacity style = { styles.button } 
          onPress = { () => this.login() } >
            <Text style = { styles.buttonText }> Login </Text>
        </TouchableOpacity>
        <TouchableOpacity style = { styles.button } 
          onPress = { () => Actions.register() } >
            <Text style = { styles.buttonText }> Register </Text>
        </TouchableOpacity>
        </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar:{
    height: 60,
    backgroundColor: '#00BCD4',
    elevation: 8,
  },
  header:{
    alignItems:'center',
    justifyContent:'center',
    //backgroundColor:'#ffffff',
  },
  headerText:{
    fontSize:20,
    padding: 10,
    fontWeight:'bold',
  },
  inputText:{
    margin: 5,
    padding: 15,
    fontSize:18,
    left: 40,
    width: 300,
    borderBottomWidth: 0,
  },
  buttons:{
    justifyContent:'center',
    alignItems:'center',
  },
  button:{
    backgroundColor:'#00BCD4',
    justifyContent:'center',
    alignItems:'center',
    height:40,
    width: 100,
    margin: 10,
    //padding: 15,
  },
  buttonText:{
    color:'white',
    fontSize: 16,
  }
});
