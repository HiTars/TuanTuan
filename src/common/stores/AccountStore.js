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

var _user = null;

// An Array of Accounts
var _acounts = [];

// A Map of Account->Accounts
var _map = {};

var AccountStore = assign({}, EventEmitter.prototype, {
  
  getCurrentUser: function() {
    return _user;
  },

  getAllAccounts: function() {
    return _acounts;
  },

  getAccountsOfAccount: function(id) {
    return _map[id];
  },

  emitChange: function(id) {
    console.log('emit: '+CHANGE_EVENT+id);
    this.emit(CHANGE_EVENT+id);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback, id) {
    this.on(CHANGE_EVENT+id, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback, id) {
    this.removeListener(CHANGE_EVENT+id, callback);
  }
});

// Register callback to handle all updates
AccountStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case AccountConstants.FETCH_ACCOUNTS:
      AV.User.currentAsync().then((currentUser) => {
        _user = currentUser;
        var query = new AV.Query(AppGlobal.Account);
        query.equalTo('user', currentUser);
        query.notEqualTo('state', -1);
        query.descending("updatedAt");
        query.include('tuan');
        query.find().then((results) => {
          _acounts = results
          console.log(_acounts);
          AccountStore.emitChange('ALL');
        }).catch((e)=>console.log(e));
      });
      break;
    case AccountConstants.FETCH_ACCOUNTS_OF_ACCOUNT:
      var query = new AV.Query(AppGlobal.Account);
      query.equalTo('tuan', action.account.get('tuan'));
      query.notEqualTo('state', -1);
      query.include('user');
      query.include('tuan');
      query.find().then((results) => {
          var members = [];
          results.sort(function(a, b) {
              return a.get('money') - b.get('money');
          });
          _map[action.account.id] = results;
          console.log(_map);
          AccountStore.emitChange(action.account.id);
      }).catch((e)=>console.log(e));
      break;

    default:
      // no op
  }
});

module.exports = AccountStore;