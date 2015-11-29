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
        <TouchableElement
          onPress={this.props.onSelect}>
          <View>
            {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
              * omit a property or set it to undefined if it's inside a shape,
              * even if it isn't required */}
            <Image style={styles.pic}
              source={{uri: 'https://avatars1.githubusercontent.com/u/16018092?v=3&s=200'}} />
          </View>
        </TouchableElement>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  pic: {
      borderRadius:50,
      width:100,
      height:100,
  }
});