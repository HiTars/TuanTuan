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
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class TuanFooter extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={
            ()=>this.props.navigator.pop()
          }>
            <Text style={styles.text}>回到首页</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={()=>this.props.navigator.push({name: 'aabill', account: this.props.account})}>
            <Text style={styles.text}>AABill</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={()=>this.props.navigator.push({name: 'aabill', account: this.props.account})}>
            <Text style={styles.text}>筹款</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    height: 30,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    fontSize: 18
  }
});