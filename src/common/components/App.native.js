/**
 * Combine Navigator And DrawerLayoutAndroid
 *
 * @author zhumeng
 *
 **/

'use strict';

import { Component } from 'react';

import React, {
  Navigator,
  StyleSheet,
  View,
  Dimensions,
  Text,
  PixelRatio,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
var cssVar = require('cssVar');

import HomeScreen from './HomeScreen'
import HomeFooter from './HomeFooter'
import TuanScreen from './TuanScreen'
import TuanFooter from './TuanFooter'
import LoginScreen from './LoginScreen'
import NavigationView from './NavigationView'
import NavigationBarRouteMapper from './NavigatorRouteMapper'

import Init from './AppInit'
Init.call();

var initialRoute = {name: 'login'};


export default function () {
  return (
      <Navigator
        initialRoute={initialRoute}
        renderScene={RouteMapper}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
      />
    );
} ;

// 拉取登录页面
function logIn(navigator) {
  navigator.push({
    name: 'login'
  });
}


var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  switch (route.name) {
    case 'login':
      return (
        <LoginScreen navigator={navigationOperations}/>
      );
    case 'home':
      return (
        <View style={{flex: 1, marginTop:70}}>
          <HomeScreen
            navigator={navigationOperations} />
          <HomeFooter
            logIn={()=>logIn(navigationOperations)} />
        </View>
      );
    case 'tuan':
      return (
        <View style={{flex: 1}}>
          <TuanScreen
            navigator={navigationOperations}
            account={route.account} />
          <TuanFooter
            navigator={navigationOperations}
            account={route.account} />
        </View>
      );
  }

};



var styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: '#e3e3e3',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
    marginVertical: 15,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: cssVar('fbui-accent-blue'),
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#e0e0e0',
    height: 56,
  },
});


