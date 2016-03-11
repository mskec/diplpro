'use strict';

import React from 'react-native';
const {
  AppRegistry,
  StyleSheet,
  View,
  WebView
} = React;

import AppConstants from '../AppConstants';
import {generateVibEmbedUrl} from '../utils/utils';


class WatchScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView
          style={styles.webView}
          source={{uri: generateVibEmbedUrl(this.props.vib)}}
          allowsInlineMediaPlayback={true}
          javaScriptEnabled={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webView: {

  }
});

AppRegistry.registerComponent('WatchScreen', () => WatchScreen);

export default WatchScreen;
