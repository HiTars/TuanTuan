/**
 * UserStore
 *
 * @author zhumeng
 *
 **/

'use strict';

import { Component } from 'react';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('eventemitter2').EventEmitter2;
var UserConstants = require('../constants/UserConstants');
var AppGlobal = require('../constants/AppGlobal');
var assign = require('object-assign');

var AV = require('avoscloud-sdk');

var CHANGE_EVENT = 'change';

// A map of id->(tuanobj, news)
var _tuans = {};

function add(tuan, news) {
  var id = tuan.get('tuanid');
  _tuans[id] = {'tuan':tuan, 'news':(news ? news:0)};
  if (tuan.dirty()) {
    return tuan.save();
  } else {
    return AV.Promise.as();
  }
}

function clearAllTuans() {
  _tuans = {};
}

var UserStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of tuans.
   * @return {object}
   */
  getAllTuans: function() {
    return _tuans;
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
UserStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case UserConstants.USER_FETCH_TUANS:
      AV.User.currentAsync().then((currentUser) => {
        clearAllTuans();
        var query = new AV.Query(AppGlobal.Account);
        query.equalTo('user', currentUser);
        query.notEqualTo('state', -1);
        query.descending("updatedAt");
        query.include('tuan');
        query.find().then((results) => {
          for (var i = 0; i < results.length; i++) {
            add(results[i].get('tuan'), results[i].get('news'));
          }
          UserStore.emitChange();
        }).catch((e)=>console.log(e));
      });
      break;

    default:
      // no op
  }
});

module.exports = UserStore;