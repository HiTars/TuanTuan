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
  StyleSheet,
  Platform,
  ToastAndroid,
} from 'react-native';

import AV from 'avoscloud-sdk';

import AccountActions from '../actions/AccountActions'

import AccountStore from '../stores/AccountStore'

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
        AccountStore.addChangeListener(this._onChange);
        AccountActions.fetchAccounts();
      }
    }, (e)=>console.log(e));
  }

  componentWillUnmount() {
    AccountStore.removeChangeListener(this._onChange);
  }

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange() {
    this._updateState();
  }

  _updateState() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(AccountStore.getAllAccounts())
    });
  }

  render () {
    return (
      <ListView contentContainerStyle={styles.list}
        style={{flex: 1}}
        keyboardDismissMode="on-drag"
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps={true}
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <TuanCell account={rowData} onSelect={() => this.selectTuan(rowData)} />
        } />
    );
  }

  selectTuan (account) {
    this.props.navigator.push({
      name: 'tuan',
      account: account,
    });
  }
}

var styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});