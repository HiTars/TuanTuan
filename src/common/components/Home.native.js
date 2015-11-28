'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  DrawerLayoutAndroid,
  ToolbarAndroid,
} from 'react-native';

export default function () {
  return Home.render();
}

var DRAWER_WIDTH_LEFT = 56;

var toolbarActions = [
  {title: 'Filter'},
];

var Home = {

  render: function() {
    return (
      <DrawerLayoutAndroid
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
        keyboardDismissMode="on-drag"
        ref={(drawer) => { this.drawer = drawer; }}
        renderNavigationView={this._renderNavigationView}>
          {this._renderNavigation()}
      </DrawerLayoutAndroid>
    );
  },

  _renderNavigationView: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          HiTars
        </Text>
        <Image style={styles.pic} source={{uri: 'https://avatars1.githubusercontent.com/u/16018092?v=3&s=200'}} />
      </View>
    );
  },

  _renderNavigation: function() {
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          actions={toolbarActions}
          navIcon={require('image!ic_menu_black_24dp')}
          onIconClicked={() => this.drawer.openDrawer()}
          style={styles.toolbar}>
          <View style={{height: 56, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 24, textAlign: 'center'}}>{'EatTogether'}</Text>
          </View>
        </ToolbarAndroid>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            HiTars
          </Text>
          <Image style={styles.pic} source={{uri: 'https://avatars1.githubusercontent.com/u/16018092?v=3&s=200'}} />
          <Text style={styles.instructions}>
            To get started, edit index.android.js
          </Text>
          <Text style={styles.instructions}>
            Shake or press menu button for dev menu
          </Text>
        </View>
      </View>
    );
  },

};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  toolbar: {
    backgroundColor: '#E9EAED',
    height: 56,
  },
  pic: {
      width:100,
      height:100,
  }
});
