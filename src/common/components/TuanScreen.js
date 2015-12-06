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
  ScrollView,
  Dimensions,
  Text,Image

} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view'
import AV from 'avoscloud-sdk'
import AccountActions from '../actions/AccountActions'
import AccountStore from '../stores/AccountStore'
import MemberCell from './MemberCell'
import HistoryRow from './HistoryRow'
import AppGlobal from '../constants/AppGlobal'
import TabBars from './TabBars'
var deviceWidth = Dimensions.get('window').width;

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
    console.log(AccountStore.getAccountsOfAccount(this.props.account.id));
    this.setState({
      membersSource: this.state.membersSource.cloneWithRows(AccountStore.getAccountsOfAccount(this.props.account.id)),
      historySource: this.state.historySource.cloneWithRows(AccountStore.getHistoryOfAccount(this.props.account.id)),
    });
  }

  _onEndReached() {
    AccountActions.fetchMoreHistoryOfAccount(this.props.account);
  }


  render() {
    console.log(this.props.account.get('tuan'))
    var tuanInfo = this.props.account.get('tuan')
    return (
       <View style={styles.container}>
        <ScrollableTabView renderTabBar={() => <TabBars />}>
          <ScrollView tabLabel="ion|ios-people" style={styles.tabView}>
            <ListView contentContainerStyle={styles.list}
            style={{flex: 1}}
            renderRow={
              (rowData) => {
                return <MemberCell account={rowData} onSelect={() => this.selectMember(rowData)} />
              }
            }
            dataSource={this.state.membersSource} />
          </ScrollView>
          <ScrollView tabLabel="ion|clock" style={styles.tabView}>
            <ListView contentContainerStyle={styles.listColumn}
            style={{flex: 1}}
            onEndReached={this.onEndReached}
            renderRow={
              (rowData) => {
                return <HistoryRow history={rowData} />
              }
            }
            dataSource={this.state.historySource} />
          </ScrollView>
          <ScrollView tabLabel="ion|wrench" style={styles.tabView}>
              <View style={styles.card} >
                <Text>
                  团名:
                  {tuanInfo.get('name')}
                </Text>
              </View>
              <View style={styles.card} >
                <Text>
                  共消费:
                  {tuanInfo.get('money')}
                </Text>
              </View>
              <View style={styles.card} >
                <Image
                    source={{uri : tuanInfo.get('qrcode').url}}
                    style={{width: 250, height: 250, }}/>
              </View>
              <View style={styles.card} >
                <Text>
                  团口号：
                  {tuanInfo.get('slogan')}
                </Text>
              </View>

          </ScrollView>
        </ScrollableTabView>
      </View>
    );
  }

  selectMember(account) {}
}

var styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  listColumn: {
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  container: {
    flex: 1,
    marginTop: 30,
  },
  tabView: {
    width: deviceWidth,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});


