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

var HISTORY_TYPE = {
    'CREATE': 1,            // 建团记录。date, username 创建 tuanname 团
    'JOIN': 2,              // 入团记录。date, username 加入 tuanname 团
    'QUIT': 3,              // 退团记录。date, username 退出 tuanname 团
    'MODIFY_NAME': 5,       // 修改团名记录。date, fromname 团的团名被 username 修改为 toname
    'MODIFY_SLOGAN': 6,     // 修改团口号记录。date, fromname 团的口号被 username 修改为 toname
    'BILL': 10,             // 消费记录。date, username 请大家(members.length+othersnum 人)消费了 money
    'REVERT_BILL': 11,      // 已经撤销的消费记录。date, xxx 请大家消费了 xxx (已撤销)
    'ABUP_BILL': 12,        // 正在进行的ABUp消费。date, username 发起了一次(members.length 人)筹款消费
    'FINISH_ABUP': 13,      // 结束的ABUp消费。date, username 发起的筹款消费已结束
    'REVERT_ABUP': 14,      // 撤销的ABUp消费。date, username 发起了筹款消费 (已撤销)
    'ABDOWN_BILL': 16,      // 正在进行的ABDown消费
    'FINISH_ABDOWN': 17,    // 结束的ABDown消费
    'REVERT_ABDOWN': 18     // 撤销的ABDown消费
};

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