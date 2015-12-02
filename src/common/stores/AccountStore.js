/**
 * AccountStore
 *
 * @author zhumeng
 *
 **/

'use strict';

import { Component } from 'react';

var AV = require('avoscloud-sdk');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('eventemitter2').EventEmitter2;
var AppGlobal = require('../constants/AppGlobal');
var assign = require('object-assign');
var AccountConstants = require('../constants/AccountConstants');

var CHANGE_EVENT = 'change';

// An Array of Accounts
var _acounts = [];

var AccountStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of accounts.
   */
  getAllAccounts: function() {
    return _acounts;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AccountStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case AccountConstants.FETCH_ACCOUNTS:
      AV.User.currentAsync().then((currentUser) => {
        var query = new AV.Query(AppGlobal.Account);
        query.equalTo('user', currentUser);
        query.notEqualTo('state', -1);
        query.descending("updatedAt");
        query.include('tuan');
        query.find().then((results) => {
          _acounts = results
          console.log(_acounts);
          AccountStore.emitChange();
        }).catch((e)=>console.log(e));
      });
      break;

    default:
      // no op
  }
});

module.exports = AccountStore;