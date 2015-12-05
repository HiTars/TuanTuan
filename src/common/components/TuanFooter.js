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
  TouchableOpacity,
} from 'react-native';

export default class TuanFooter extends Component {
  render () {
    return (
      <View style={{flexDirection: 'row', height: 72, borderTopWidth: 1, borderColor: 'gray'}}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={()=>this.props.navigator.push({name: 'aabill', account: this.props.account})}>
            <Text style={{fontSize: 18}}>AABill</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, borderLeftWidth: 1, borderColor: 'gray'}}>
          <Text style={{fontSize: 32}}>2</Text>
        </View>
        <View style={{flex: 1, borderLeftWidth: 1, borderColor: 'gray'}}>
          <Text style={{fontSize: 32}}>3</Text>
        </View>
        <View style={{flex: 1, borderLeftWidth: 1, borderColor: 'gray'}}>
          <Text style={{fontSize: 32}}>4</Text>
        </View>
        <View style={{flex: 1, borderLeftWidth: 1, borderColor: 'gray'}}>
          <Text style={{fontSize: 32}}>5</Text>
        </View>
      </View>
    );
  }
}