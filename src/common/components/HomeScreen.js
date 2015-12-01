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
  ToastAndroid,
} from 'react-native';

import AV from 'avoscloud-sdk';

import TuanCell from './TuanCell'

export default class HomeScreen extends Component {

  // 模块加载时需确保登录状态
  componentDidMount() {
    AV.User.currentAsync().then((currentUser) => {
      console.log('currentUser: ',currentUser);
      if (!currentUser) {
        this.props.logIn();
      } else {
        //TodoActions.fetchAll();
      }
    });
  }

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