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

import UserActions from '../actions/UserActions'

import UserStore from '../stores/UserStore'

import TuanCell from './TuanCell'

function getUserState() {
  return {
    allTuans: UserStore.getAllTuans()
  };
}

export default class HomeScreen extends Component {

  // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
  constructor(props) {
    super(props);
    this.state = getUserState();

    // Bind callback methods to make `this` the correct context.
    this._onChange = this._onChange.bind(this);
  }

  // 模块加载时需确保登录状态
  componentDidMount() {
    AV.User.currentAsync().then((currentUser) => {
      console.log('currentUser: ',currentUser);
      if (!currentUser) {
        this.props.logIn();
      } else {
        UserActions.fetchTuans();
        UserStore.addChangeListener(this._onChange);
      }
    }, (e)=>console.log(e));
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange() {
    this.setState(getUserState());
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