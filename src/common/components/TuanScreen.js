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

import AV from 'avoscloud-sdk';

import AccountActions from '../actions/AccountActions'
import AccountStore from '../stores/AccountStore'
import MemberCell from './MemberCell'

export default class TuanScreen extends Component {

  // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }

    // Bind callback methods to make `this` the correct context.
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    AccountStore.addChangeListener(this._onChange);
    AccountActions.fetchAccounts();
  }

  componentWillUnmount() {
    AccountStore.removeChangeListener(this._onChange);
  }

  /**
   * Event handler for 'change' events coming from the AccountStore
   */
  _onChange() {
    this._updateState();
  }

  _updateState() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(AccountStore.getAllAccounts())
    });
  }

  render() {
    return (
      <ListView contentContainerStyle={styles.list}
        style={{flex: 1}}
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <MemberCell account={rowData} onSelect={() => this.selectMember(rowData)} />
        } />
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