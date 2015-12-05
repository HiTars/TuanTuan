/**
 * TuanCell
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

export default class TuanCell extends Component {
  render () {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    console.log(this.props.account.get('tuan'));
    return (
      <View>
        <TouchableElement onPress={this.props.onSelect}>
          <View style={styles.circleWrap}>
          <View style={styles.circle}>
            <Text style={styles.welcome}>
              {this.props.account.get('tuan').get('name')}
            </Text>
          </View>
          </View>
        </TouchableElement>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  welcome: {
    fontSize: 15,
    color: 'white'
  },
  circleWrap : {
    height: 80,
    width: 80,
    margin: 10,
    backgroundColor: 'rgba(164, 129, 200, .3)',
    borderRadius: 80/2,
    justifyContent: 'center',
    alignItems: 'center',

  },
  circle: {
    height: 70,
    width: 70,
    margin: 10,
    backgroundColor: 'rgb(164,129,200)',
    borderRadius: 70/2,
    justifyContent: 'center',
    alignItems: 'center',

  }
});