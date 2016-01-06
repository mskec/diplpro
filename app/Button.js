'use strict';

import React from 'react-native';
const {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight
} = React;

import {appColors} from './AppConstants';


class Button extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.wrapper}
        onPress={() => this.props.onPress()}
      >
        <Text style={styles.text}>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    padding: 5
  },
  text: {
    color: '#FFF'
  }
});

AppRegistry.registerComponent('Button', () => Button);

export default Button;
