/**
 * HistoryRow
 *
 * @author zhumeng
 *
 **/

'use strict';

import { Component } from 'react';

import React, {
  StyleSheet,
  Image,
  Text,
  View,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';

export default class HistoryRow extends Component {

  // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
  constructor(props) {
    super(props);

    this.state = {
      selected: false
    }

    // Bind callback methods to make `this` the correct context.
    this._onPress = this._onPress.bind(this);
  }

  render () {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View>
        <TouchableElement onPress={this.props.checkable ? this._onPress : this.props.onSelect}>
          <View style={getCircleWrapStyles(this.state.selected)}>
          <View style={getCircleStyles(this.state.selected)}>
            <Text style={styles.welcome}>
              {this.props.history.get('type')}
            </Text>
          </View>
          </View>
        </TouchableElement>
      </View>
    );
  }

  _onPress() {
    this.setState({
      selected: !this.state.selected
    });
    this.props.onSelect();
  }
}

var getCircleStyles = function(selected) {
  return {
    height: 70,
    width: 70,
    margin: 10,
    backgroundColor: 'rgb(164,129,200)',
    borderRadius: 70/2,
    backgroundColor: (selected ? 'rgb(164,129,200)' : 'rgb(0,129,200)'),
    justifyContent: 'center',
    alignItems: 'center',
  }
};
var getCircleWrapStyles = function(selected) {
  return {
    height: 80,
    width: 80,
    margin: 10,
    borderRadius: 80/2,
    backgroundColor: (selected ? 'rgba(164,129,200, .5)' : 'rgba(0,129,200, .5)'),
    justifyContent: 'center',
    alignItems: 'center',
  }
};

var styles = StyleSheet.create({
  welcome: {
    fontSize: 15,
    color: 'white'
  }
});