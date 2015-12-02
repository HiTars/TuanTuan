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
  ListView,
  Platform,
  ToastAndroid,
} from 'react-native';

import AV from 'avoscloud-sdk';

import UserActions from '../actions/UserActions'

import UserStore from '../stores/UserStore'

import TuanCell from './TuanCell'

export default class HomeScreen extends Component {

  // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }

    // Bind callback methods to make `this` the correct context.
    this._onChange = this._onChange.bind(this);
    this._updateState = this._updateState.bind(this);
  }

  // 模块加载时需确保登录状态
  componentDidMount() {
    AV.User.currentAsync().then((currentUser) => {
      console.log('currentUser: ',currentUser);
      if (!currentUser) {
        this.props.logIn();
      } else {
        UserStore.addChangeListener(this._onChange);
        UserActions.fetchTuans();
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
    this._updateState();
  }

  _updateState() {
    tuansArray = [];
    tuans = UserStore.getAllTuans();
    for (var key in tuans) {
      tuansArray.push({key, value: tuans[key]});
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(tuansArray)
    });
  }

  render () {
    return (
      <ListView
        style={{flex: 1}}
        keyboardDismissMode="on-drag"
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps={true}
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <TuanCell id={rowData.key} tuan={rowData.value} onSelect={() => this.selectTuan(rowData.value)} />
        } />
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