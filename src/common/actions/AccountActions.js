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