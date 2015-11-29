/**
 * TuanFooter
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

export default class TuanFooter extends Component {
  render () {
    return (
      <View style={{flexDirection: 'row', height: 72, borderTopWidth: 1, borderColor: 'gray'}}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 48}}>1</Text>
        </View>
        <View style={{flex: 1, borderLeftWidth: 1, borderColor: 'gray'}}>
          <Text style={{fontSize: 48}}>2</Text>
        </View>
        <View style={{flex: 1, borderLeftWidth: 1, borderColor: 'gray'}}>
          <Text style={{fontSize: 48}}>3</Text>
        </View>
        <View style={{flex: 1, borderLeftWidth: 1, borderColor: 'gray'}}>
          <Text style={{fontSize: 48}}>4</Text>
        </View>
        <View style={{flex: 1, borderLeftWidth: 1, borderColor: 'gray'}}>
          <Text style={{fontSize: 48}}>5</Text>
        </View>
      </View>
    );
  }
}