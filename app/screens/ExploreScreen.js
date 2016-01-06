'use strict';

import _ from 'underscore';
import Slider from 'react-native-slider';
import React from 'react-native';
const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

import appColors from '../appColors';
import {formatFreeTime} from '../utils/utils';


class ExploreScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      freeTime: {
        sliderValue: 0.2,
        label: formatFreeTime(0.2)
      }
    };

    this.onSliderChange = this.onSliderChange.bind(this);
  }

  onSliderChange(value: Number) {
    const freeTime = {
      sliderValue: value,
      label: formatFreeTime(value)
    };

    this.setState(Object.assign(this.state, {freeTime}));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSlider()}
        {this.renderVideos()}
      </View>
    );
  }

  renderSlider() {
    return (
      <View style={styles.sliderContainer}>
        <View style={styles.sliderLabelContainer}>
          <Text style={styles.sliderLabel}>
            Your free time
          </Text>
          <Text style={styles.sliderLabel}>
            {this.state.freeTime.label}
          </Text>
        </View>
        <Slider
          value={this.state.freeTime.sliderValue}
          onValueChange={(value) => this.onSliderChange(value)}
          minimumTrackTintColor={appColors.fontColor}
          maximumTrackTintColor="#FFF"
          trackStyle={styles.sliderTrack}
          thumbStyle={styles.sliderThumb}
        />
      </View>
    );
  }

  renderVideos(videos: Array) {
    const content = _.map(['a', 'b', 'c'], (video, idx) => this.renderVideo(video, idx));

    return (
      <View style={styles.videosContainer}>
        <View style={styles.videosLabelContainer}>
          <Text style={styles.videosLabel}>Recommended videos</Text>
          <Text style={[styles.videosLabel, styles.videosPlayAll]}>Play all</Text>
        </View>

        <View style={styles.videos}>
          {content}
        </View>
      </View>
    );
  }

  renderVideo(video: Object, idx: Number) {
    return (
      <View style={styles.videoContainer} key={idx}>
        <Text>{idx}. video</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },

  sliderContainer: {
    marginTop: 20,
    justifyContent: 'center'
  },
  sliderThumb: {
    backgroundColor: '#D8D8D8',
    borderColor: appColors.borderGrey,
    borderWidth: 1
  },
  sliderTrack: {
    height: 6
  },
  sliderLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sliderLabel: {
    color: appColors.fontColor,
    fontSize: 16
  },

  videosContainer: {
    marginTop: 30
  },
  videosLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  videosLabel: {
    color: appColors.fontColor,
    fontSize: 18
  },
  videosPlayAll: {
    fontSize: 12
  },
  videos: {

  },
  videoContainer: {

  }

});

AppRegistry.registerComponent('ExploreScreen', () => ExploreScreen);

export default ExploreScreen;
