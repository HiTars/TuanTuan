/**
 * AccountActions
 *
 * @author zhumeng
 *
 **/

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';

import AccountConstants from '../constants/AccountConstants';

var AccountActions = {

  fetchAccounts: function() {
    AppDispatcher.dispatch({
      actionType: AccountConstants.FETCH_ACCOUNTS
    });
  },

  fetchAccountsOfAccount: function(account) {
    AppDispatcher.dispatch({
      actionType: AccountConstants.FETCH_ACCOUNTS_OF_ACCOUNT,
      account: account
    });
  },

  fetchHistoryOfAccount: function(account, start, length) {
    AppDispatcher.dispatch({
      actionType: AccountConstants.FETCH_HISTORY_OF_ACCOUNT,
      account: account,
      start: start,
      length: length
    });
  },

  doAABill: function(account, selected, othersnum, price) {
    AppDispatcher.dispatch({
      actionType: AccountConstants.DO_AABILL,
      account: account,
      selected: selected,
      othersnum: othersnum,
      price: price
    });
  },

};

module.exports = AccountActions;