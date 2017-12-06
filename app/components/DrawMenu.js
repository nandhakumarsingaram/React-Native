import React from 'react';
import {  StyleSheet, 
          Text, View, 
          ScrollView, 
          FlatList, 
          TouchableOpacity,
          Image } from 'react-native';

export default class DrawMenu extends React.Component {
  render() {
    return (
        <View style = { styles.container } >
            
        <View style = { styles.header } >
              <Image
                source={require('../images/materialDesign.png')}
              />
        </View>
        <View>
          <FlatList
            data={[
              {key: 'Export to CSV'},
              {key: 'Manage Categories'},
              {key: 'About'},
              {key: 'Feedback'},
            ]}
          renderItem={({item}) => <TouchableOpacity style={styles.touchableOpacity} ><Text style={styles.item}>{item.key}</Text></TouchableOpacity>}
          />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'flex-end',
    //borderBottomWidth: 10,
    //borderBottomColor: '#ddd',
    elevation: 8,
  },
  headerText:{
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 26,
  },
  item: {
    padding: 15,
    fontSize: 18,
    height: 60,
  },
});