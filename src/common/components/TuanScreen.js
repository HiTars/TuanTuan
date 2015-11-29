/**
 * TuanScreen
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

import MemberCell from './MemberCell'

export default class TuanScreen extends Component {
  render () {
    var memberObj = {
      id: 0,
    };
    return (
      <View style={{flex: 1}}>
        <MemberCell
          id={memberObj.id}
          onSelect={() => this.selectMember(memberObj)} />
      </View>
    );
  }

  selectMember (memberObj) {
    if (Platform.OS === 'ios') {
    } else {
    }
  }
}