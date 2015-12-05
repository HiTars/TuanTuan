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
import Nav from './Navigator'

import Init from './AppInit'
Init.call();

var initialRoute = {name: 'home'};


export default function () {
  return (
      <Nav
        initialRoute={initialRoute}
        renderScene={RouteMapper}/>
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
        <View style={{flex: 1}}>
          <HomeScreen
            navigator={navigationOperations}
            logIn={()=>logIn(navigationOperations)} />
          <HomeFooter
            logIn={()=>logIn(navigationOperations)} />
        </View>
      );
    case 'tuan':
      return (
        <View style={{flex: 1, marginTop : 70}}>
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
  navBar: {
    backgroundColor: '#e3e3e3',
  }
});


