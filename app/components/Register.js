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
         DrawerLayoutAndroid } from 'react-native';
import DrawMenu from './DrawMenu';
import AddTransaction from './AddTransaction';
import { Actions } from 'react-native-router-flux'; 
import { firebaseApp } from './FirebaseConfig.js';
import Main from './Main';
export default class Register extends React.Component {


constructor(props){
  super(props);
  this.state = {
    email:'',
    password:''
  }
}

register(){
  //alert(this.state.email);
  firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then(()=>{
          Alert.alert(
            'Alert Title',
            'register email: '+this.state.email,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => Actions.login()},
            ],
            { cancelable: false }
          )
          this.setState({
            email:'',
            password:''
          });
  })
  .catch(function(error) {
        Alert.alert(
          'Alert Title',
          'registered', + error,
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => this.navigate('Main')},
          ],
          { cancelable: false }
        )
    });
}



  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
          <StatusBar 
            backgroundColor='#018ea0'
          />
          <View style={styles.header} >
            <Text style={styles.headerText} >Register</Text>
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
          onPress = { () => this.register() } >
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
