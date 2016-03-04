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
  constructor() {
    super();

    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }

  onNavigationStateChange(navState) {
    console.log('watch|onNavigationStateChange', navState.url);
  }


  render() {
    console.log('watch|render');
    return (
      <View style={styles.container}>
        <WebView
          style={styles.webView}
          source={{uri: generateVibEmbedUrl(this.props.vib)}}
          onNavigationStateChange={this.onNavigationStateChange}
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
