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

};

module.exports = AccountActions;