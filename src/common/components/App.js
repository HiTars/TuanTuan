'use strict';

import Home from './Home';

import { Component } from 'react';

export default class App extends Component {
  render () {
    return Home.call(this, this.props, this.state);
  }
}
