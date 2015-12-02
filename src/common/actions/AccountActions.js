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

};

module.exports = AccountActions;