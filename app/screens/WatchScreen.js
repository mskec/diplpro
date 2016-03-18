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
import Spinner from '../Spinner';


class WatchScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView
          style={styles.webView}
          source={{uri: generateVibEmbedUrl(this.props.vib)}}
          allowsInlineMediaPlayback={true}
          javaScriptEnabled={true}
          startInLoadingState={true}
          renderLoading={this.renderLoading}
        />
      </View>
    );
  }

  renderLoading() {
    return (
      <View style={styles.spinnerContainer}>
        <Spinner />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webView: {

  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('WatchScreen', () => WatchScreen);

export default WatchScreen;
