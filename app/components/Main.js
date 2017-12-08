import React, { Component } from 'react';
import { StatusBar, 
         StyleSheet, 
         Text, 
         View, 
         ToolbarAndroid,
         TextInput, 
         ScrollView, 
         TouchableOpacity, 
         Image, 
         DrawerLayoutAndroid,
         AsyncStorage,
         DatePickerAndroid } from 'react-native';
import DrawMenu from './DrawMenu';
import AddTransaction from './AddTransaction';
import { Actions } from 'react-native-router-flux'; 
import { firebaseApp } from './FirebaseConfig.js';

export default class Main extends React.Component {
constructor(){
  super();
  this.state = {
      setDate : 'Date',
      date : '',
      month : '',
      year : '',
      months : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      data : firebaseApp.database().ref('users').child(firebaseApp.auth().currentUser.uid).on("value",snap => {
        let datas = JSON.stringify(snap.val());
        alert(datas[0].amount);
    })
  }
}

logout(){
    firebaseApp.auth().signOut().then(function() {
      alert('Sign-out successful.!');
      AsyncStorage.setItem('userId', "nothing");
      Actions.login();
    }).catch(function(error) {
      alert(error);
    });
}


  onSetDate(date,month,year){
    this.setState({
        setDate : this.state.months[month]+' '+date+' '+year
    });
  }

  showPicker = async (stateKey, options) => {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      } else {
        var date = new Date(year, month, day);
        this.onSetDate(day,month,year);
      }
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  render() {
    alert(this.state.userId);

    var navigationView = (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <DrawMenu />
    </View>
    );
    const { navigate } = this.props.navigation;
    return (

      <View style = { styles.container } >
      <DrawerLayoutAndroid
        drawerWidth={250}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView} >
        
          <StatusBar 
            backgroundColor='#018ea0'
          />

          <ToolbarAndroid
          style = {styles.toolbar}
          navIcon={require('../images/menu2.png')}
          title="SayMoney"
          actions={[{title: 'Settings', icon: require('../images/menu2.png'), show: 'always'}]}
           onActionSelected={this.menu}
           />

        <ScrollView>
                  <View>
                  <TouchableOpacity style = { styles.anotherButton } >
                  <Image
                    style={{height: 20, width: 20}}
                    source={require('../images/calendar.png')}  
                  />
                  </TouchableOpacity>
                  <Text style={styles.inputText} 
                  onPress={this.showPicker.bind(this, 'spinner', { date: this.state.presetDate })}> 
                  {this.state.setDate}
                  </Text>
                </View>
               <Text style={styles.transactionText}>
                  Press ' + ' button to add transactions.
               </Text>   
        </ScrollView>

          <TouchableOpacity style = { styles.addButton }
          onPress = { () => Actions.addNew() }  >
            <Text style = {styles.addButtonText}>+</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style = { styles.logoutButton }
          onPress = { () => this.logout() }  >
            <Image
                style={{height: 25, width: 25}}
                source={require('../images/logout.png')}
                
              />
          </TouchableOpacity>
          
      </DrawerLayoutAndroid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar:{
    height: 60,
    backgroundColor: '#00BCD4',
    elevation: 8,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#00BCD4',
    alignItems: 'center',
    justifyContent: 'center',
    //borderBottomWidth: 10,
    //borderBottomColor: '#ddd',
    height:60,
    elevation: 8,
  },
  headerText:{
    color: '#F8F8F8',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    bottom: 10,
  },
  addButton:{
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 100,
    backgroundColor: '#00BCD4',
    width: 56,
    height: 56,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    //shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3,
  },
  logoutButton:{
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    right: 25 ,
    bottom: 40 ,
    alignItems: 'center',
    borderRadius: 50,
    width: 48,
    height: 48,
    justifyContent: 'center',
    elevation: 6,
  },
  addButtonText:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  transactionText:{
    padding: 10,
    fontSize: 15
  },
    anotherButton:{
    position: 'absolute',
    zIndex: 5,
    //right: 30,
    width: 56,
    height: 56,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText:{
    margin: 5,
    padding: 15,
    fontSize:18,
    left: 40,
    width: 300,
    borderBottomWidth: 0,
  },
});
