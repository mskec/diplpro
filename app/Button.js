'use strict';

import React from 'react-native';
const {
  AppRegistry,
  PropTypes,
  StyleSheet,
  Text,
  TouchableHighlight
} = React;

import {appColors} from './AppConstants';


class Button extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    textStyle: Text.propTypes.style,
    wrapperStyle: TouchableHighlight.propTypes.style
  };

  static defaultProps = {
    onPress: () => {},
    text: 'Button',
    textStyle: {},
    wrapperStyle: {}
  };

  render() {
    return (
      <TouchableHighlight
        style={[styles.wrapper, this.props.wrapperStyle]}
        onPress={() => this.props.onPress()}
      >
        <Text style={[styles.text, this.props.textStyle]}>
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
