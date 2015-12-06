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
var _accountsMap = {};

// A Map of Account->History
var _historyMap = {};

var AccountStore = assign({}, EventEmitter.prototype, {

  getCurrentUser: function() {
    return _user;
  },

  getAllAccounts: function() {
    return _acounts;
  },

  getAccountsOfAccount: function(id) {
    return _accountsMap[id];
  },

  getHistoryOfAccount: function(id) {
    return _historyMap[id];
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

var fetchAccounts = function() {
  var query = new AV.Query(AppGlobal.Account);
  query.equalTo('user', _user);
  query.notEqualTo('state', -1);
  query.descending("updatedAt");
  query.include('tuan');
  query.find().then((results) => {
    _acounts = results
    AccountStore.emitChange('ALL');
  });
};

var fetchAccountsOfAccount = function(account) {
  var query = new AV.Query(AppGlobal.Account);
  query.equalTo('tuan', account.get('tuan'));
  query.notEqualTo('state', -1);
  query.include('user');
  query.include('tuan');
  query.find().then((results) => {
    results.sort(function(a, b) {
        return a.get('money') - b.get('money');
    });
    _accountsMap[account.id] = results;
    AccountStore.emitChange(account.id);
  }).catch((e)=>console.log(e));
}

var _fetchPagedHistoryOfAccount = function(account, start) {
  var query = new AV.Query(AppGlobal.TuanHistory);
  query.equalTo('tuan', account.get('tuan'));
  query.descending("createdAt");
  query.skip(start);
  query.limit(start+10);
  query.include('creater');
  return query.find();
}

var fetchHistoryOfAccount = function(account) {
  _fetchPagedHistoryOfAccount(account, 0).then((results) => {
    _historyMap[account.id] = results;
    AccountStore.emitChange(account.id);
  }).catch((e)=>console.log(e));
}

var fetchMoreHistoryOfAccount = function(account) {
  _fetchPagedHistoryOfAccount(account, _historyMap[account.id].length).then((results) => {
    _historyMap[account.id] = _historyMap[account.id].concat(results);
    AccountStore.emitChange(account.id);
  }).catch((e)=>console.log(e));
}

var genHistory = function(user, tuan, type, notice) {
  var tuanHistory = new AppGlobal.TuanHistory();
  tuanHistory.set('creater', user);
  tuanHistory.set('tuan', tuan);
  tuanHistory.set('type', type);
  tuanHistory.set('data', {
      'username': user.get('nickname'),
      'tuanname': tuan.get('name')
  });
  if (notice) {
    var query = new AV.Query(AppGlobal.Account);
    query.equalTo('tuan', tuan);
    query.notEqualTo('state', -1);
    query.find().then(function(results) {
      // 给所有团员发消息
      for (var i = 0; i < results.length; i++) {
        results[i].increment('news');
        results[i].save();
      }
    });
  }
  return tuanHistory.save();
};

// 创建一条Account或激活原来的Account
var joinTuan = function(user, tuan, account) {
  var record = false;
  if (account) {
    if (account.get('state') == -1) {
      // 以前加入过该团
      record = true;
      tuan.increment('members');
      account.set('tuan', tuan);
      account.set('state', 0);
    }
  } else {
    // 第一次加入该团
    record = true;
    account = new AppGlobal.Account();
    tuan.increment('members');
    account.set('user', user);
    account.set('tuan', tuan);
    account.set('money', 0);
    account.set('state', 0);
    account.set('news', 0);
  }
  if (record) {
    // 生成入团记录
    genHistory(user, tuan, AppGlobal.HISTORY_TYPE.JOIN, true);
  }
  return account.save();
};

var getSelectedAccounts = function(account, selected) {
  var accounts = [];
  for (var i = 0; i < _accountsMap[account.id].length; i++) {
    if (selected[_accountsMap[account.id][i].id]) {
      accounts.push(_accountsMap[account.id][i]);
    }
  }
  return accounts;
};

// 删除团，该团成员的账户，所有团历史
var deleteTuan = function(tuan) {
    var accountQuery = new AV.Query(AppGlobal.Account);
    accountQuery.equalTo('tuan', tuan);
    accountQuery.destroyAll();
    var historyQuery = new AV.Query(AppGlobal.TuanHistory);
    historyQuery.equalTo('tuan', tuan);
    historyQuery.destroyAll();
    tuan.destroy();
};

// 记录一笔消费
var recordAccount = function (account, money, isnew) {
    /*var history = account.get('history'); // 个人近期消费历史，记录时间和金额
    if (isnew && (money >= 0 || !history)) {
        // 正向消费或尚未有历史记录(抹除之前记录，写入当前余额和本次消费金额)
        history = [];
        history.push({
            'money' : formatFloat(account.get('money'))
        });
        history.push({
            'money' : formatFloat(money),
            'time': new Date().getTime()
        });
    } else {
        if (isnew) {
            // 新的负向消费(加入一笔记录)
            history.push({
                'money' : formatFloat(money),
                'time': new Date().getTime()
            });
        } else {
            // 修改消费(修改最后一个消费记录)
            history[history.length-1].money = formatFloat(money + Number(history[history.length-1].money));
            history[history.length-1].time = new Date().getTime();
        }
    }
    account.set('history', history);*/
    account.increment('money', money);
};

/** AA 买单
 * 1. 给买单者记账(account是买单者)
 * 2. 给被买单者记账(accounts是被买单者)，并群发消费信息
 */
var doAABill = function(account, accounts, othersnum, price) {
  var num = accounts.length;
  if (num > 0 && othersnum >= 0 && othersnum < 100 && price >= 0 && price < 5000) {
    var avg = Math.ceil(price * 100 / (num + othersnum)) / 100;
    // 给买单者记账
    recordAccount(account, avg * num, true);
    // 给团成员记账(注意团成员中包含买单者的情况)
    var members = [];
    var promises = [];
    for (var i = 0; i < num; i++) {
        var current = accounts[i];
        if (current.get('user').id == _user.id) {
            current = account;
        }
        recordAccount(current, -avg, true);
        current.increment('news');
        members.push(current.get('user').id);
        promises.push(current.save());
    }
    // 给买单者记总账
    account.get('user').increment('money', avg * num);
    // 给该团记总账
    account.get('tuan').increment('money', avg * num);
    promises.push(account.save());
    AV.Promise.when(promises).then(function() {
      // 生成消费记录
      var user = account.get('user');
      var tuan = account.get('tuan');
      var tuanHistory = new AppGlobal.TuanHistory();
      tuanHistory.set('creater', user);
      tuanHistory.set('tuan', tuan);
      tuanHistory.set('type', AppGlobal.HISTORY_TYPE.BILL);
      tuanHistory.set('data', {
        'username': user.get('nickname'),
        'tuanname': tuan.get('name'),
        'othersnum': othersnum,
        'money': price,
        'members': members
      });
      tuanHistory.save();
      // 重新获取History(accounts不需要重新获取，因为其直接对Store进行的修改)
      fetchHistoryOfAccount(account);
    }).catch((e)=>console.log(e));
  } else {
    AppGlobal.alert('Invalid Parameters');
  }
};

// Register callback to handle all updates
AccountStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case AccountConstants.FETCH_ACCOUNTS:
      AV.User.currentAsync().then((currentUser) => {
        _user = currentUser;
        fetchAccounts();
      }).catch((e)=>console.log(e));
      break;
    case AccountConstants.FETCH_ACCOUNTS_OF_ACCOUNT:
      fetchAccountsOfAccount(action.account);
      break;
    case AccountConstants.FETCH_HISTORY_OF_ACCOUNT:
      fetchHistoryOfAccount(action.account);
      break;
    case AccountConstants.FETCH_MORE_HISTORY_OF_ACCOUNT:
      fetchMoreHistoryOfAccount(action.account);
      break;
    case AccountConstants.CREATE_ACCOUNT:
      var tuan = new AppGlobal.Tuan();
      tuan.fetchWhenSave(true);
      tuan.set('name', '新团');
      tuan.set('creater', _user);
      tuan.set('money', 0);
      tuan.set('news', 0);
      tuan.set('members', 0);
      tuan.set('slogan', '给一个响亮的团口号吧！');
      tuan.save().then(function(tuan) {
        // 生成建团记录
        genHistory(_user, tuan, AppGlobal.HISTORY_TYPE.CREATE, false);
        // 加入团
        return joinTuan(_user, tuan, null);
      }).then(() => {
        fetchAccounts();
      }).catch((e)=>console.log(e));
      break;
    case AccountConstants.QUIT_TUAN:
      var message = null;
      if (action.account.get('tuan').get('members') < 2) {
        message = '您是最后一个退出该团的人，团信息将被全部清理';
        deleteTuan(action.account.get('tuan'));
      } else {
        var money = formatFloat(action.account.get('money'));
        if (money > 10) {
          // 清除账户余额再退团
          message = '您在该团还有较多结余(' + money + ')，请销账后再退团';
        } else if (money < -10) {
          // 清除账户余额再退团
          message = '您在该团还有较多欠款(' + money + ')，请销账后再退团';
        } else {
          // 直接退团，生成退团记录
          genHistory(_user, tuan, AppGlobal.HISTORY_TYPE.QUIT, true);
          message = '您在该团只有(' + money + ')团币，系统已经直接退团';
          action.account.get('tuan').increment('members', -1);
          // 只标记不删除
          action.account.set('state', -1);
          action.account.set('news', 0);
          action.account.save();
        }
      }
      fetchAccounts();
      AppGlobal.alert(message);
      break;
    case AccountConstants.DO_AABILL:
      doAABill(action.account, getSelectedAccounts(action.account, action.selected), action.othersnum, action.price);
      break;
    default:
      // no op
  }
});

module.exports = AccountStore;