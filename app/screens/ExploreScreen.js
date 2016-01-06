'use strict';

import _ from 'underscore';
import Slider from 'react-native-slider';
import React from 'react-native';
const {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

import appColors from '../appColors';
import {formatFreeTime} from '../utils/utils';
import VBStorage from '../storage/VBStorage';


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
    this.onVibPress = this.onVibPress.bind(this);
  }

  componentDidMount() {
    VBStorage.loadExplore()
      .then(() => VBStorage.getExplore())
      .then((vibs) => {
        this.setState(Object.assign(this.state, {vibs}))
      });
  }

  onSliderChange(value: Number) {
    const freeTime = {
      sliderValue: value,
      label: formatFreeTime(value)
    };

    this.setState(Object.assign(this.state, {freeTime}));
  }

  onVibPress(vib: Object) {
    console.log('onVibPress', vib);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSlider()}
        {this.renderVibs(this.state.vibs)}
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

  renderVibs(vibs: Array) {
    return (
      <View style={styles.vibsContainer}>
        <View style={styles.vibsLabelContainer}>
          <Text style={styles.vibsLabel}>Recommended videos</Text>
          <Text style={[styles.vibsLabel, styles.vibsPlayAll]}>Play all</Text>
        </View>

        <View style={styles.vibs}>
          {_.map(vibs, (vib, idx) => this.renderVib(vib, idx))}
        </View>
      </View>
    );
  }

  renderVib(vib: Object, idx: Number) {
    return (
      <View style={styles.vibContainer} key={vib._id}>
        <TouchableHighlight onPress={() => this.onVibPress(vib)}>
          <View>
            <Image
              style={styles.vibThumbnail}
              source={{uri: vib.video.metadata.thumbnail}}
            />

            <View style={styles.vibMetadataContainer}>

            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    margin: 10
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

  vibsContainer: {
    marginTop: 30
  },
  vibsLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  vibsLabel: {
    color: appColors.fontColor,
    fontSize: 18
  },
  vibsPlayAll: {
    fontSize: 12
  },
  vibs: {
    marginTop: 10
  },
  vibContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginBottom: 15
  },
  vibThumbnail: {
    backgroundColor: '#DDD',
    height: 81,
    width: 148
  },
  vibMetadataContainer: {
    flex: 1
  }

});

AppRegistry.registerComponent('ExploreScreen', () => ExploreScreen);

export default ExploreScreen;
