import React from 'react';
import Main from './app/components/Main';
import Summary from './app/components/Summary';
import Menu from './app/components/Menu';
import Login from './app/components/Login';
import AddTransaction from './app/components/AddTransaction';
import Register from './app/components/Register';
import { StyleSheet, 
         Text, 
         View,
         DrawerLayoutAndroid, Navigator } from 'react-native';
import { Router, Scene } from 'react-native-router-flux'
import { StackNavigator } from 'react-navigation';

export default class NavigationDrawer extends Component {

  render () {
    const state = this.props.navigationState
    const children = state.children
    return (
      <Drawer
        ref='navigation'
        type='static'
        open={state.open}
        acceptPan
        onOpen={() => NavigationActions.refresh({key: state.key, open: true})}
        onClose={() => NavigationActions.refresh({key: state.key, open: false})}
        content={<DrawerContent />}
        styles={Styles}
        captureGestures
        tapToClose
        openDrawerOffset={100}
        panCloseMask={0.8}
        panThreshold={150}
        negotiatePan
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    )
  }
}