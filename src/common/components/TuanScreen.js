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
  ListView,
  StyleSheet,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view'
import AV from 'avoscloud-sdk'
import AccountActions from '../actions/AccountActions'
import AccountStore from '../stores/AccountStore'
import MemberCell from './MemberCell'
import HistoryRow from './HistoryRow'
import AppGlobal from '../constants/AppGlobal'

export default class TuanScreen extends Component {

  // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
  constructor(props) {
    super(props);

    this.state = {
      membersSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      historySource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }

    // Bind callback methods to make `this` the correct context.
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    AccountActions.fetchAccountsOfAccount(this.props.account);
    AccountActions.fetchHistoryOfAccount(this.props.account);
    AccountStore.addChangeListener(this._onChange, this.props.account.id);
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
    this.setState({
      membersSource: this.state.membersSource.cloneWithRows(AccountStore.getAccountsOfAccount(this.props.account.id)),
      historySource: this.state.historySource.cloneWithRows(AccountStore.getHistoryOfAccount(this.props.account.id)),
    });
  }

  _onEndReached() {
    AccountActions.fetchMoreHistoryOfAccount(this.props.account);
  }

  render() {
    return (
      <ScrollableTabView>
        <View tabLabel="成员">
          <ListView contentContainerStyle={styles.list}
            style={{flex: 1}}
            renderRow={
              (rowData) => {
                return <MemberCell account={rowData} onSelect={() => this.selectMember(rowData)} />
              }
            }
            dataSource={this.state.membersSource} />
        </View>
        <View tabLabel="历史">
          <ListView contentContainerStyle={styles.list}
            style={{flex: 1}}
            onEndReached={this.onEndReached}
            renderRow={
              (rowData) => {
                return <HistoryRow history={rowData} onSelect={() => this.selectMember(rowData)} />
              }
            }
            dataSource={this.state.historySource} />
        </View>
        <View tabLabel="设置"/>
      </ScrollableTabView>
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


