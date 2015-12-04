/**
 * MemberCell
 *
 * @author zhumeng
 *
 **/

'use strict';

import { Component } from 'react';

import React, {
  StyleSheet,
  Image,
  Text,
  View,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';

export default class MemberCell extends Component {
  render () {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View>
        <TouchableElement onPress={this.props.onSelect}>
          <View style={styles.circle}>
            <Text style={styles.welcome}>
              {this.props.account.get('user').get('nickname')}
            </Text>
          </View>
        </TouchableElement>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: 'red',
    justifyContent: 'center', 
    alignItems: 'center',
  }
});