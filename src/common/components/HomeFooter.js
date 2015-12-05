/**
 * HomeFooter
 *
 * @author zhumeng
 *
 **/

'use strict';

import { Component } from 'react';

import React, {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';

export default class HomeFooter extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.me}>
          <TouchableHighlight onPress={this.props.logIn}>
              <Text>Login</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.createBtn}>
          <Text style={styles.createBtnText}>建团</Text>
        </View>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    height: 40,
  },
  me : {
    borderTopWidth: 1,
    flex: 2,
  },
  createBtn : {
    flex: 1,
    borderLeftWidth : 1,
    borderLeftColor : 'orange',
     backgroundColor: 'orange'
  },
  createBtnText : {

    color:'white',
    fontSize: 25,
  }

});