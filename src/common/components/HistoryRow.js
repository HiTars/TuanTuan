/**
 * HistoryRow
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

export default class HistoryRow extends Component {

  // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
  constructor(props) {
    super(props);

    this.state = {
      selected: false
    }

    // Bind callback methods to make `this` the correct context.
    this._onPress = this._onPress.bind(this);
  }


  render () {
    let data = this.props.history.get('data')
    var date = (this.props.history.createdAt).toISOString().replace(/T.+/, '')
    switch (this.props.history.get('type')) {
      case 1 :
        return (
          <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.welcome}>
              {data.username}创建{data.tuanname}
            </Text>
          </View>
        );
      case 2 :
        return (
          <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.welcome}>
              {data.username}加入{data.tuanname}
            </Text>
          </View>
        );
      case 3 :
        return (
          <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.welcome}>
              {data.username}退出{data.tuanname}
            </Text>
          </View>
        );
      case 5 :
        return (
          <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.welcome}>
              {data.fromname}团的团名被{data.username}修改为{data.toname}
            </Text>
          </View>
        );
      case 6 :
        return (
          <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.welcome}>
              {data.fromname}团的口号被{data.username}修改为{data.toname}
            </Text>
          </View>
        );
      case 10:
        if (this.props.history.get('included')) {
          return (
            <View style={styles.container}>
              <Text style={styles.date}>{date}</Text>
              <Text style={styles.welcome}>
                {data.username}请大家{data.members.length + data.othersnum}人消费了{data.money} 元
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styles.container}>
              <Text style={styles.date}>{date}</Text>
              <Text style={styles.welcome}>
                {data.username}请大家{data.members.length + data.othersnum}人消费了{data.money} 元
                (除我)
              </Text>
            </View>
          );
        }
      case  11:
        return (
          <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.welcome}>
              {data.username}请大家{data.members.length}人消费了{data.money}元（已撤销）
            </Text>
          </View>
        );
      case  12:
        return (
          <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.welcome}>
              {data.username}发起了一次{data.members.length}人筹款消费
            </Text>
          </View>
        );
      case  13:
        return (
          <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.welcome}>
              {data.username}发起的筹款消费已经结束
            </Text>
          </View>
        );
      case  14:
        return (
          <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.welcome}>
              {data.username}发起了筹款消费（已撤销）
            </Text>
          </View>
        );
      default :
        return (
          <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.welcome}>
              默认

            </Text>
          </View>
        );
    }

  }

  _onPress() {
    this.setState({
      selected: !this.state.selected
    });
    this.props.onSelect();
  }
}


var styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical : 10
  },
  date: {
    fontSize: 15,
    color: 'black',
    marginRight:5
  },
  welcome: {
    width: 210,
    fontSize: 15,
    color: 'black',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});