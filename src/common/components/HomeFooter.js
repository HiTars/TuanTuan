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
  Text,
} from 'react-native';

export default class HomeFooter extends Component {
  render () {
    return (
      <View style={{flexDirection: 'row', height: 72, borderTopWidth: 1, borderColor: 'gray'}}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20}}>Tars</Text>
        </View>
        <View style={{flex: 4, borderLeftWidth: 1, borderRightWidth: 1, borderColor: 'gray'}}>
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20}}>建团</Text>
        </View>
      </View>
    );
  }
}