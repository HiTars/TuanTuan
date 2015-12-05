'use strict';

import AppNative from './App.native.js';

import { Component } from 'react';

export default class App extends Component {
  render () {
    return AppNative.call(this, this.props, this.state);
  }
}
