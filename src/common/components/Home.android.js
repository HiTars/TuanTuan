'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  Dimensions,
  DrawerLayoutAndroid,
  ToolbarAndroid,
} from 'react-native';

import Native from './Home.native';

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
    return Native.call(this, this.props, this.state);
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
        {Native.call(this, this.props, this.state)}
      </View>
    );
  },

};

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#E9EAED',
    height: 56,
  }
});
