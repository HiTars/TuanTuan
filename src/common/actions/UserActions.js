/**
 * UserActions
 *
 * @author zhumeng
 *
 **/

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';

import UserConstants from '../constants/UserConstants';

var UserActions = {

  fetchTuans: function() {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_FETCH_TUANS
    });
  },

};

module.exports = UserActions;