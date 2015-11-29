/**
 * HomeScreen
 *
 * @author zhumeng
 *
 **/

'use strict';

import { Component } from 'react';

import React, {
  View,
  Platform,
} from 'react-native';

import TuanCell from './TuanCell'

export default class HomeScreen extends Component {
  render () {
    var tuanObj = {
      id: 0,
      money: 100,
    };
    return (
      <View style={{flex: 1}}>
        <TuanCell
          id={tuanObj.id}
          onSelect={() => this.selectTuan(tuanObj)} />
      </View>
    );
  }

  selectTuan (tuanObj) {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        id: tuanObj.id,
        component: TuanScreen,
        passProps: {tuanObj},
      });
    } else {
      this.props.navigator.push({
        id: tuanObj.id,
        name: 'tuan',
        tuan: tuanObj,
      });
    }
  }
}