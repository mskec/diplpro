'use strict';

import _ from 'underscore';
import React from 'react-native';
const {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

import {appColors} from '../AppConstants';
import {formatDuration} from '../utils/utils';
import VBStorage from '../storage/VBStorage';


class ExploreScreen extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.onVibPress = this.onVibPress.bind(this);
  }

  componentDidMount() {
    VBStorage.loadExplore()
      .then(() => VBStorage.getExplore())
      .then((vibs) => {
        this.setState(Object.assign(this.state, {vibs}))
      });
  }

  onVibPress(vib: Object) {
    this.props.navigator.push({name: 'Watch', vib});
  }

  render() {
    return (
      <View style={s.container}>
        {this.renderVibs(this.state.vibs)}
      </View>
    );
  }

  renderVibs(vibs: Array) {
    return (
      <View style={s.vibsContainer}>
        <View style={s.vibsLabelContainer}>
          <Text style={s.vibsLabel}>Recommended videos</Text>
        </View>

        <View style={s.vibs}>
          {_.map(vibs, (vib, idx) => this.renderVib(vib, idx))}
        </View>
      </View>
    );
  }

  renderVib(vib: Object, idx: Number) {
    return (
      <View style={s.vibContainer} key={vib._id}>
        <TouchableHighlight onPress={() => this.onVibPress(vib)}>
          <View style={s.vibWrapper}>
            <Image
              style={s.vibThumbnail}
              source={{uri: vib.video.metadata.thumbnail}}
            />

            <View style={s.vibMetadataContainer}>
              <Text style={s.vibTitle}>{vib.title.substr(0, 60)}</Text>
              <Text style={s.vibDuration}>{formatDuration(vib.duration)}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

}


const vibsStyles = {
  vibsContainer: {
    marginTop: 20
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
  vibs: {
    marginTop: 15
  },

  vibContainer: {
    backgroundColor: '#FFF',
    marginBottom: 15
  },
  vibWrapper: {
    flexDirection: 'row'
  },
  vibThumbnail: {
    backgroundColor: '#DDD',
    height: 90,
    width: 160
  },
  vibMetadataContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    padding: 10,
    height: 90,
    width: 1    // for some reason this is necessary to make width 100%
  },
  vibTitle: {
    color: appColors.fontGrey,
    fontSize: 14
  },
  vibDuration: {
    color: appColors.fontGrey,
    fontSize: 12
  }
};

const screenStyles = {
  container: {
    margin: 10
  }
};

const s = StyleSheet.create(Object.assign({}, screenStyles, vibsStyles));

AppRegistry.registerComponent('ExploreScreen', () => ExploreScreen);

export default ExploreScreen;
