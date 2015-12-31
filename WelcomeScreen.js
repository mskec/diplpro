'use strict';

import _ from 'underscore';
import React from 'react-native';
const {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} = React;

import Alert from './Alert';
import appColors from './appColors';
import ExploreScreen from './ExploreScreen';

const categories = [
  {label: 'Comedy'},
  {label: 'Sports'},
  {label: 'Technology'},
  {label: 'Education'},
  {label: 'Music'},
  {label: 'Film & TV'},
  {label: 'Gaming'}
];

class WelcomeScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      categories: categories,
      name: ''
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onCategoryPress = this.onCategoryPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {
    // TODO load categories from server or from cache
  }

  onNameChange(name: String) {
    console.log('onNameChange', name);

    this.setState(Object.assign(this.state, {name: name}));
  }

  onCategoryPress(category: Object) {
    console.log('onCategoryPress', category);
    category._selected = !category._selected;

    this.forceUpdate();
  }

  onNextPress() {
    console.log('onNextPress', this.state);

    const nameValid = !/^\s*$/.test(this.state.name);
    const selectedCategories = _.filter(this.state.categories, category => category._selected);

    if (!nameValid || selectedCategories.length === 0) {
      let message = !nameValid ? 'Enter your name!\n' : '';
      message += selectedCategories.length === 0 ? 'Select at least one category' : '';
      return Alert.show(message.trim());
    }

    // TODO save name and categories to device

    // go to Explore screen
    Platform.OS === 'ios' && this.props.navigator.resetTo({component: ExploreScreen});
    Platform.OS === 'android' && this.props.navigator.replace({name: 'Explore'});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTitle()}

        {this.renderName()}

        {this.renderCategories(categories)}

        {this.renderNext()}
      </View>
    );
  }

  renderTitle() {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Welcome
        </Text>
      </View>
    );
  }

  renderName() {
    return (
      <View style={styles.nameContainer}>
        <Text style={styles.name}>
          Enter your name
        </Text>
        <TextInput
          onChangeText={this.onNameChange}
          style={styles.nameInput}
        />
      </View>
    );
  }

  renderCategories(categories: Array) {
    var content = categories.map((category, idx) => {
      return (
      <TouchableOpacity
        key={idx}
        onPress={() => this.onCategoryPress(category)}
        style={[styles.category, category._selected && styles.categorySelected]}>
        <Text style={[styles.categoryText, category._selected && styles.categoryTextSelected]}>
          {category.label}</Text>
      </TouchableOpacity>
      );
    });
    return (
    <View style={styles.categoriesContainer}>
      <Text style={styles.categoriesTitle}>Pick categories</Text>
      <View style={styles.categories}>
        {content}
      </View>
    </View>
    );
  }

  renderNext() {
    return (
      <View style={styles.nextContainer}>
        <TouchableOpacity style={styles.next} onPress={() => this.onNextPress()}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30
  },

  titleContainer: {
    marginTop: Platform.OS === 'ios' ? 70 : 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 48,
    color: '#FFF'
  },

  nameContainer: {
    marginTop: Platform.OS === 'ios' ? 80 : 50,
    alignItems: 'flex-start'
  },
  nameInput: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7C7F98',
    borderRadius: 5,
    backgroundColor: '#FFF',
    flex: 1,
    height: 35,
    paddingLeft: 10,
    paddingRight: 10
  },
  name: {
    color: appColors.fontColor,
    fontSize: 20,
    marginBottom: 15
  },

  categoriesContainer: {
    marginTop: 50
  },
  categoriesTitle: {
    color: appColors.fontColor,
    fontSize: 20,
    marginBottom: 15
  },
  categories: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  category: {
    backgroundColor: '#FFF',
    borderRadius: 13,
    borderStyle: 'solid',
    borderColor: '#FFF',
    // borderWidth is not working for some reason
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,

    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    marginBottom: 10
  },
  categorySelected: {
    backgroundColor: appColors.background,
    borderWidth: 1,
    borderColor: appColors.borderGrey
  },
  categoryText: {
    color: appColors.fontGrey,
    fontSize: 16,
    fontWeight: 'bold'
  },
  categoryTextSelected: {
    color: appColors.fontColor
  },

  nextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  next: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: appColors.borderGrey,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  nextText: {
    color: appColors.fontColor,
    fontSize: 16
  }
});

AppRegistry.registerComponent('WelcomeScreen', () => WelcomeScreen);

export default WelcomeScreen;
