/**
 * NavigationView
 *
 * @author zhumeng
 *
 **/

'use strict';

import { Component } from 'react';

import React, {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';

export default class NavigationView extends Component {
  render () {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View style={styles.container}>
        <TouchableElement onPress={this.props.logIn}>
          <View>
            <Text style={styles.welcome}>
              Login
            </Text>
            <Image style={styles.pic} source={{uri: 'https://avatars1.githubusercontent.com/u/16018092?v=3&s=200'}} />
          </View>
        </TouchableElement>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    // textAlign: 'center',
    margin: 10,
  },
  pic: {
    width:100,
    height:100,
  }
});