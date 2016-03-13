'use strict';

import React from 'react-native';
const {
  AppRegistry,
  Linking,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity
} = React;


class Hypertext extends React.Component {
  static propTypes = {
    href: PropTypes.string,
    text: PropTypes.string,
    textStyle: Text.propTypes.style
  };

  static defaultProps = {
    text: '',
    textStyle: {}
  };

  onPress(href: String) {
    Linking.openURL(href);
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.onPress(this.props.href)}>
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#2CA3FF'
  }
});

AppRegistry.registerComponent('Hypertext', () => Hypertext);

export default Hypertext;
