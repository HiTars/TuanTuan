
import { Component } from 'react';

import React, {
    Navigator,

  StyleSheet,
  View,
  Dimensions,
  Text,
  PixelRatio,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
var cssVar = require('cssVar');

export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNav: false,
    };
  }

  render(){
    let navBar = null;

    if (this.state.showNav) {
      navBar = (
        <Navigator.NavigationBar
          routeMapper={NavigationBarRouteMapper}
          style={styles.navBar}/>
      );
    }

    return (
      <Navigator
        initialRoute = {this.props.initialRoute}
        renderScene  = {this.props.renderScene}
        onWillFocus  = {this.onNavWillFocus.bind(this)}
        navigationBar= {navBar} />
    )
  }

  onNavWillFocus(route) {
    if (route.showNav !== undefined && this.state.showNav !== route.showNav) {
      this.setState({showNav: route.showNav});
    }
  }
}

        // configureScene={Router.configureScene}




var NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }
    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton: function(route, navigator, index, navState) {
    return  null;
  },
  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

};




var styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: '#e3e3e3',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
    marginVertical: 15,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: cssVar('fbui-accent-blue'),
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#e0e0e0',
    height: 56,
  },
});


