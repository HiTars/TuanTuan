'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default function () {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        HiTars
      </Text>
      <Image style={styles.pic} source={{uri: 'https://avatars1.githubusercontent.com/u/16018092?v=3&s=200'}} />
      <Text style={styles.instructions}>
        To get started, edit index.android.js
      </Text>
      <Text style={styles.instructions}>
        Shake or press menu button for dev menu
      </Text>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  pic: {
      width:100,
      height:100,
  }
});