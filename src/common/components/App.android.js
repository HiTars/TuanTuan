/**
 * Combine Navigator And DrawerLayoutAndroid
 *
 * @author zhumeng
 *
 **/

'use strict';

import { Component } from 'react';

import React, {
  BackAndroid,
  Navigator,
  StyleSheet,
  ToolbarAndroid,
  View,
  Dimensions,
  DrawerLayoutAndroid,
} from 'react-native';

import HomeScreen from './HomeScreen'
import HomeFooter from './HomeFooter'
import TuanScreen from './TuanScreen'
import TuanFooter from './TuanFooter'
import LoginScreen from './LoginScreen'
import NavigationView from './NavigationView'

import Init from './AppInit'
Init.call();

var DRAWER_WIDTH_LEFT = 56;

var toolbarActions = [
  {title: 'Filter'},
];

export default class App extends Component {
  render () {
    var initialRoute = {name: 'home'};
    return (
      <Navigator
        style={styles.container}
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper} />
    );
  }
}

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

// 拉取登录页面
function logIn(navigator) {
  navigator.push({
    name: 'login'
  });
}

function _renderNavigationView() {
  return (
    <NavigationView
      style={{flex: 1}} />
  );
}

function renderHome(drawer, navigationOperations) {
  var _drawer;
  return (
    <DrawerLayoutAndroid
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
        keyboardDismissMode="on-drag"
        ref={(drawer) => { _drawer = drawer; }}
        renderNavigationView={_renderNavigationView}>
      <View style={{flex: 1}}>
        <ToolbarAndroid
          actions={[]}
          navIcon={require('image!ic_menu_black_24dp')}
          onIconClicked={() => _drawer.openDrawer()}
          style={styles.toolbar}
          titleColor="black"
          title={'EatTogether'} />
        <HomeScreen
          navigator={navigationOperations}
          logIn={()=>logIn(navigationOperations)} />
        <HomeFooter />
      </View>
    </DrawerLayoutAndroid>
  );
}

function renderTuan(navigationOperations) {
  return (
    <View style={{flex: 1}}>
      <ToolbarAndroid
        actions={[]}
        navIcon={require('image!android_back_white')}
        onIconClicked={navigationOperations.pop}
        style={styles.toolbar}
        titleColor="black"
        title={'TuanName'} />
      <TuanScreen
        navigator={navigationOperations} />
      <TuanFooter />
    </View>
  );
}

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  if (route.name === 'login') {
    return (
      <LoginScreen navigator={navigationOperations}/>
    );
  } else if (route.name === 'home') {
    return renderHome(route.drawer, navigationOperations);
  } else if (route.name === 'tuan') {
    return renderTuan(navigationOperations);
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#e0e0e0',
    height: 56,
  },
});