import React from 'react';
import { StyleSheet,
         Text, 
         View, 
         TextInput, 
         ScrollView, 
         TouchableOpacity, 
         StatusBar,
         Image,
         Picker,
         DatePickerAndroid,
         ToolbarAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux'; 
import { firebaseApp } from './FirebaseConfig.js';

export default class AddTransaction extends React.Component {

  constructor(){
    super();
    this.state = {
      setDate : 'Date',
      date : '',
      month : '',
      year : '',
      months : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      type: 'income',
      category : 'food',
      categorys: ['Food', 'Rent', 'Shopping', 'Groceries', 'Add'],
      amount: '',
      notes: '',
      userId : firebaseApp.auth().currentUser.uid,
    }
    //console.ignoredYellowBox : ['Setting a timer'];
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


transactionDetail(){
  if(this.state.amount==' '){
      alert('Enter the details');
  }else{
    firebaseApp.database().ref().child('users/' + this.state.userId).push().set({
      date : this.state.setDate,
      category : this.state.category,
      type : this.state.type,
      amount : this.state.amount,
      notes : this.state.notes
    });

    //alert(this.state.setDate+' '+this.state.category+' '+this.state.type+' '+this.state.amount+' '+this.state.notes);
    Actions.main();
  }
}
  render() {
    return (
      <View style = { styles.container } >
        <StatusBar 
            backgroundColor='#018ea0'
          />
          <ToolbarAndroid
          style = {styles.toolbar}
          title="New Transaction"
          navIcon={require('../images/menu2.png')}
          actions={[{title: 'Settings', icon: require('../images/menu2.png'), show: 'always'}]}
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
        <View>
          <TouchableOpacity style = { styles.anotherButton } >
            <Image
              style={{height: 20, width: 20}}
              source={require('../images/change.png')}  
          />
          </TouchableOpacity>
            <Picker style = {styles.pickerStyle}
              selectedValue={this.state.type}
              onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}>
              <Picker.Item label="Income" value="income" />
              <Picker.Item label="Expense" value="expense" />
            </Picker>
        </View>

        <View>
          <TouchableOpacity style = { styles.anotherButton } >
            <Image
              style={{height: 20, width: 20}}
              source={require('../images/diagram.png')}  
          />
          </TouchableOpacity>
            <Picker style = {styles.pickerStyle}
              selectedValue={this.state.category}
              onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
              <Picker.Item label="Food" value="food" />
              <Picker.Item label="Rent" value="rent" />
              <Picker.Item label="Travel" value="Travel" />
              <Picker.Item label="Shopping" value="shopping" />
            </Picker>
        </View>

        <View>
            <TouchableOpacity style = { styles.anotherButton }  >
              <Image
                style={{height: 20, width: 20}}
                source={require('../images/rich.png')}
                
              />
          </TouchableOpacity>
          <TextInput
          style={styles.inputText}
          placeholder="Amount"
          onChangeText = {(amount) => this.setState({amount})}
          value={this.state.email}
          />
        </View>
        
        <View>
            <TouchableOpacity style = { styles.anotherButton }  >
            <Image
              style={{height: 20, width: 20}}
              source={require('../images/notepad.png')}
              
            />
          </TouchableOpacity>
          <TextInput
          style={styles.inputText}
          placeholder="Notes"
          onChangeText = {(notes) => this.setState({notes})}
          value={this.state.notes}
          />

        </View>
        </ScrollView>
          <TouchableOpacity style = { styles.addButton } 
          onPress = { () => this.transactionDetail() } >
            <Image
              style={{height: 20, width: 20}}
              source={require('../images/checked.png')}  
            />
          </TouchableOpacity>
          <TouchableOpacity style = { styles.cancelButton } 
          onPress = { () => Actions.main() } >
            <Text style = { styles.cancelButtonText }> x </Text>
          </TouchableOpacity>

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
    height: 60,
    elevation: 8,
  },
  headerText:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  categoryView:{
    alignItems:'flex-end',
  },
  datePickerButton:{
    margin: 5,
    padding: 15,
    fontSize:18,
    left: 40,
    width: 60,
    height: 20,
    color:'red',
    top: 10,
    fontSize: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
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
  pickerStyle:{
    left: 40,
    padding: 42,
    width: 300,
  },
  addButton:{
    backgroundColor: '#00BCD4',
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 40,
    //backgroundColor: '#38953b',
    width: 56,
    height: 56,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  cancelButton:{
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    zIndex: 11,
    right: 25,
    bottom: 110,
    //backgroundColor: '#38953b',
    width: 48,
    height: 48,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  cancelButtonText:{
    color: '#00BCD4',
    fontSize: 24,
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
  dateButton:{
    width: 100,
    height: 56,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  dateButtonText:{
    justifyContent:'flex-end',
  }
});

