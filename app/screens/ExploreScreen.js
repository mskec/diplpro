'use strict';

import _ from 'underscore';
import React from 'react-native';
const {
  AppRegistry,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;
import GiftedListView from 'react-native-gifted-listview';


import {appColors} from '../AppConstants';
import {formatDuration} from '../utils/utils';
import VBStorage from '../storage/VBStorage';
import Spinner from '../Spinner';
import Hypertext from '../Hypertext';


class ExploreScreen extends React.Component {
  constructor() {
    super();

    this.renderVib = this.renderVib.bind(this);
    this.renderLoadMore = this.renderLoadMore.bind(this);
    this.onVibPress = this.onVibPress.bind(this);
    this.onPagination = this.onPagination.bind(this);
  }

  componentDidMount() {
    VBStorage.loadExplore();
  }

  onVibPress(vib: Object) {
    this.props.navigator.push({name: 'Watch', vib});
  }

  onPagination(page, cb, options) {
    let vibsPerPage = 6;
    VBStorage.getExplore(page - 1, vibsPerPage)
      .then((vibs) => {
        cb(vibs, {allLoaded: vibs.length !== vibsPerPage});
      });
  }

  render() {
    return (
      <View style={s.container}>
        {this.renderVibs()}
      </View>
    );
  }

  renderVibs() {
    return (
      <View style={s.vibsContainer}>
        <GiftedListView
          style={s.vibs}
          rowView={this.renderVib}
          onFetch={this.onPagination}
          pagination={true}
          paginationFetchingView={() => <Spinner />}
          paginationWaitingView={this.renderLoadMore}
          paginationAllLoadedView={this.renderAllLoaded}
        />
      </View>
    );
  }

  renderLoadMore(loadMoreCb) {
    return (
      <TouchableOpacity onPress={loadMoreCb} style={s.paginationContainer}>
        <Text style={s.paginationLabel}>Load more</Text>
      </TouchableOpacity>
    );
  }

  renderAllLoaded() {
    return (
      <View style={s.paginationContainer}>
        <Text style={s.paginationLabel}>No more vibs, go to </Text>
        <Hypertext
          href="https://www.vibby.com"
          text="www.vibby.com"
        />
        <Text style={s.paginationLabel}> and create some!</Text>
      </View>
    );
  }

  renderVib(vib: Object) {
    return (
      <View style={s.vibContainer} key={vib._id}>
        <TouchableOpacity onPress={() => this.onVibPress(vib)}>
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
        </TouchableOpacity>
      </View>
    );
  }

}


const vibsStyles = {
  vibsContainer: {

  },
  vibs: {
    marginBottom: Platform.OS === 'ios' ? -40 : 0
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

const paginationStyles = {
  paginationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paginationLabel: {
    color: '#FFF'
  }
};

const screenStyles = {
  container: {
    margin: 10
  }
};

const s = StyleSheet.create(Object.assign({}, screenStyles, vibsStyles, paginationStyles));

AppRegistry.registerComponent('ExploreScreen', () => ExploreScreen);

export default ExploreScreen;
