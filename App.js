import React from 'react';
import Main from './app/components/Main';
import Summary from './app/components/Summary';
import DrawMenu from './app/components/DrawMenu';
import Login from './app/components/Login';
import AddTransaction from './app/components/AddTransaction';
import Register from './app/components/Register';
import { StyleSheet, 
         Text, 
         View,
         DrawerLayoutAndroid, Navigator } from 'react-native';
import { Router, Scene , Actions} from 'react-native-router-flux'
import { StackNavigator } from 'react-navigation';

export default class App extends React.Component {

   render() {

      var sceness = Actions.create(
        <Scene key = 'root'>
          <Scene
           key = "login"
           navigationBarStyle = {Styles.navbar}
           hideNavBar = {true}
           component = {Login}
           title = "Login"
           initial
           />
          <Scene
           key = "register"
           navigationBarStyle = {Styles.navbar}
           hideNavBar = {false}
           component = {Register}
           title = "SayMoney"
          />
          <Scene
           key = "tabbar"
           tabs
           tabBarPosition = {'bottom'}
           tabBarStyle = {Styles.tabbar}
           >
            
            <Scene key = "mainTab" title ="Transactions" >
             <Scene
             key = "main"
             hideNavBar = {true}
             component = {Main}
             title = "Transactions"
             initial
             />
             <Scene
             key = "addNew"
             hideNavBar = {true}
             component = {AddTransaction}
             title = "New Transaction"
             />
             <Scene
             key = "menu"
             hideNavBar = {true}
             component = {DrawMenu}
             title = "Menu"
             />
             </Scene>
              
            <Scene key = "summaryTab" title ="Summary" >
             <Scene
             key = "summary"
             hideNavBar = {true}
             component = {Summary}
             title = "Summary"
             initial
             />
             </Scene>

             </Scene>
             </Scene>
       );

    return(
      <Router scenes = {sceness} />
  );
}
}

const Styles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
  toolbar:{
    height: 60,
    backgroundColor: '#00BCD4',
  },
  tabbar:{
    bottom: 20,
    height: 35,
  },
  navbar:{
    height:60,
    elevation: 8,
    backgroundColor: '#00BCD4',
  },
}