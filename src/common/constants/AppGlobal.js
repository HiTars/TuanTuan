/**
 * AppGlobal
 *
 * @author zhumeng
 *
 **/

'use strict';

import React, {
  Platform,
  AlertIOS,
  ToastAndroid,
} from 'react-native';

import AV from 'avoscloud-sdk';

exports.TOKEN = 'EatTogether';
var USER_STATE;

if (false) {
  // 当前环境为「生产环境」，是线上正式运行的环境
  console.log('「生产环境」');
  setOnline();
} else {
  // 当前环境为「开发环境」，是由命令行工具启动的
  console.log('「开发环境」');
  setTest();
}

function setOnline() {
  USER_STATE = 1;

  exports.Tuan = AV.Object.extend("Tuan");
  exports.TuanHistory = AV.Object.extend("TuanHistory");
  exports.Account = AV.Object.extend("Account");
}

function setTest() {
  USER_STATE = 2;

  exports.Tuan = AV.Object.extend("DEVTuan");
  exports.TuanHistory = AV.Object.extend("DEVTuanHistory");
  exports.Account = AV.Object.extend("DEVAccount");
}

exports.alert = function(message) {
  message = JSON.stringify(message);
  console.log(message);
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else {
    AlertIOS.alert(
      message,
      null,
      [
        {text: 'OK'},
      ]
    );
  }
}