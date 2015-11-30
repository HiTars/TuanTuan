/**
 * App Init
 *
 * @author zhumeng
 *
 **/

'use strict';

var AV = require('avoscloud-sdk');

export default function () {
  // 替换 App ID 和 App Key
  AV.initialize('vk84p7j0sizwl03zgvb3y1eg6z7klbs97hrgock7ilfascaf', 'pxbvfffu8uli2tcld6sg9pgfouoq1fbse6l4bf0xt1ukaqrq');
  AV.Promise.setPromisesAPlusCompliant(true);
}