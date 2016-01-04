'use strict';

import React from 'react-native';
const {
  AppRegistry,
  StyleSheet,
  WebView
} = React;


class WatchScreen extends React.Component {
  constructor() {
    super();

    this.state = {url: 'https://staging.vibby.com/embed/?vib=XyG_eq0Ttg'}
  }

  render() {
    return (
      <WebView
        style={styles.webView}
        url={this.state.url}
        allowsInlineMediaPlayback={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  webView: {
    flex: 1
  }
});

AppRegistry.registerComponent('WatchScreen', () => WatchScreen);

export default WatchScreen;
