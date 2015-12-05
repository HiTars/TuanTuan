'use strict';

import Render from './App.native.js';

import { Component } from 'react';

export default class App extends Component {
  render () {
    return Render.call(this, this.props, this.state);
  }
}
