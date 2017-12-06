import React from 'react';
import {Text,View, StatusBar, ToolbarAndroid,StyleSheet,ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux'; 

export default class Summary extends React.Component {
   render() {
    return ( 
        <View>
         <StatusBar 
            backgroundColor='#018ea0'
          />

          <ToolbarAndroid
          style = {styles.toolbar}
          navIcon={require('../images/menu2.png')}
          title="SayMoney"
          actions={[{title: 'Settings', icon: require('../images/menu2.png'), show: 'always'}]}
           />
        <ScrollView>
               <Text style={styles.transactionText}>
                  Your transactions.
               </Text>   
        </ScrollView>

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
  transactionText:{
    padding: 10,
    fontSize: 15
  },
  
});


