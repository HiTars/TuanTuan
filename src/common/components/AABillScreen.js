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

export default class AABillScreen extends Component {

  // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
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
    AppGlobal.alert(AccountStore.getCurrentUser());
    this.setState({
      user: AccountStore.getCurrentUser(),
      dataSource: this.state.dataSource.cloneWithRows(AccountStore.getAccountsOfAccount(this.props.account.id))
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 108, backgroundColor: 'gray'}}>
          <Text>{}请你吃饭</Text>
        </View>
        <ListView contentContainerStyle={styles.list}
        style={{flex: 1}}
        renderRow={(rowData) => <MemberCell account={rowData} onSelect={() => this.selectMember(rowData)} />}
        dataSource={this.state.dataSource} />
      </View>
    );
  }

  selectMember(account) {}
}

var styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});