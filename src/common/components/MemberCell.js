/**
 * MemberCell
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

export default class MemberCell extends Component {

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
          <View style={getCircleStyles(this.state.selected)}>
            <Text style={styles.welcome}>
              {this.props.account.get('user').get('nickname')}
            </Text>
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
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: (selected?'blue':'red'),
    justifyContent: 'center', 
    alignItems: 'center',
  }
};

var styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
  }
});