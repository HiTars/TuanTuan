/**
 * AABillScreen
 *
 * @author zhumeng
 *
 **/

'use strict';

import { Component } from 'react';

import React, {
  View,
  Text,
  ListView,
  StyleSheet,
} from 'react-native';

import AV from 'avoscloud-sdk';

import AccountActions from '../actions/AccountActions'
import AccountStore from '../stores/AccountStore'
import MemberCell from './MemberCell'
import AppGlobal from '../constants/AppGlobal'

export default class AABillScreen extends Component {

  // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
  constructor(props) {
    super(props);

    // user不能初始化为null，不然render里可能会先访问到null
    this.state = {
      user: AccountStore.getCurrentUser(),
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      selected: {}
    }

    // Bind callback methods to make `this` the correct context.
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    AccountStore.addChangeListener(this._onChange, this.props.account.id);
    AccountActions.fetchAccountsOfAccount(this.props.account);
  }

  componentWillUnmount() {
    AccountStore.removeChangeListener(this._onChange, this.props.account.id);
  }

  /**
   * Event handler for 'change' events coming from the AccountStore
   */
  _onChange() {
    this._updateState();
  }

  _updateState() {
    accounts = AccountStore.getAccountsOfAccount(this.props.account.id);
    this.setState({
      user: AccountStore.getCurrentUser(),
      dataSource: this.state.dataSource.cloneWithRows(accounts),
      selected: this._clearSelected(false)
    });
  }

  _clearSelected(flag) {
    selected = {};
    accounts = AccountStore.getAccountsOfAccount(this.props.account.id);
    for (var i = 0; i < accounts.length; i++) {
      selected[accounts[i].id] = flag;
    }
    return selected;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 158, backgroundColor: 'gray'}}>
          <Text>{this.state.user.get('nickname')}请你吃饭</Text>
        </View>
        <ListView contentContainerStyle={styles.list}
          style={{flex: 1}}
          renderRow={(rowData) =>
            <MemberCell account={rowData}
              onSelect={() => this.selectMember(rowData)}
              selected={this.state.selected[rowData.id]} />
          }
          dataSource={this.state.dataSource} />
      </View>
    );
  }

  selectMember(account) {
    this.state.selected[account.id] = true;
  }

}

var styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});