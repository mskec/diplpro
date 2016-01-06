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

import Alert from '../Alert';
import appColors from '../appColors';
import AppStorage from '../storage/AppStorage';
import VBStorage from '../storage/VBStorage';


class WelcomeScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      categories: [],
      name: ''
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onCategoryPress = this.onCategoryPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {
    VBStorage.getCategories()
      .then((categories) => {
        this.setState(Object.assign(this.state, {categories}));
      });

    AppStorage.getItem('user.name')
      .then((username) => {
        this.setState(Object.assign(this.state, {name: username}));
      });
  }

  onNameChange(name: String) {
    this.setState(Object.assign(this.state, {name: name}));
  }

  onCategoryPress(category: Object) {
    category._selected = !category._selected;

    this.forceUpdate();
  }

  onNextPress() {
    const nameValid = this.state.name && /^\w+$/.test(this.state.name);
    const selectedCategories = _.filter(this.state.categories, category => category._selected);

    if (!nameValid || selectedCategories.length === 0) {
      let message = !nameValid ? 'Enter your name!\n' : '';
      message += selectedCategories.length === 0 ? 'Select at least one category' : '';
      return Alert.show(message.trim());
    }

    AppStorage.user().setName(this.state.name);
    AppStorage.user().setCategories(selectedCategories);
    AppStorage.state('welcomeShown', 'true');

    // go to Explore screen
    this.props.navigator.replace({name: 'Explore'});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTitle()}

        {this.renderName()}

        {this.renderCategories(this.state.categories)}

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
          style={styles.nameInput}
          onChangeText={this.onNameChange}
          value={this.state.name}
        />
      </View>
    );
  }

  renderCategories(categories: Array) {
    const content = _.map(categories, (category, idx) => this.renderCategory(category, idx));
    return (
    <View style={styles.categoriesContainer}>
      <Text style={styles.categoriesTitle}>Pick categories</Text>
      <View style={styles.categories}>
        {content}
      </View>
    </View>
    );
  }

  renderCategory(category: Object, idx: Number) {
    return (
      <TouchableOpacity
        key={idx}
        onPress={() => this.onCategoryPress(category)}
        style={[styles.category, category._selected && styles.categorySelected]}
      >
        <Text style={[styles.categoryText, category._selected && styles.categoryTextSelected]}>
          {category.label}
        </Text>
      </TouchableOpacity>
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
    marginTop: Platform.OS === 'ios' ? 65 : 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 48,
    color: '#FFF'
  },

  nameContainer: {
    marginTop: Platform.OS === 'ios' ? 75 : 45,
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
    marginTop: 45
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
