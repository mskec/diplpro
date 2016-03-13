
import moment from 'moment';

import AppStorage from '../storage/AppStorage';
import VBStorage from '../storage/VBStorage';


class ExploreService {

  shouldRefresh() {
    return AppStorage.state('explore.lastRefresh')
      .then((lastRefresh) => {
        if (!lastRefresh) {
          return true;
        }

        return moment(lastRefresh).add(6, 'hours').isBefore(moment());
      });
  }

  loadExplore() {
    return VBStorage.loadExplore()
      .then(() => AppStorage.state('explore.lastRefresh', moment().format()));
  }

}

export default new ExploreService;
