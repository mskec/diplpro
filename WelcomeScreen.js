'use strict';

import React from 'react-native';
let {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} = React;

import appColors from './appColors';


let categories = [
  {label: 'Comedy'},
  {label: 'Sports'},
  {label: 'Technology'},
  {label: 'Education'},
  {label: 'Music'},
  {label: 'Film & TV'},
  {label: 'Gaming'}
];

let WelcomeScreen = React.createClass({

  getInitialState: function() {
    return {
      categories: categories,
      name: ''
    };
  },

  componentDidMount: function() {
    // TODO load categories from server or from cache
  },

  onNameChange: function(name: String) {
    console.log('onNameChange', name);

    let newState = this.state;
    newState.name = name;
    this.setState(newState);
  },

  onCategoryPress: function(category: Object) {
    console.log('onCategoryPress', category);
    category._selected = !category._selected;

    this.forceUpdate();
  },

  onNextPress: function() {
    // TODO validation and next screen
    console.log('onNextPress', this.state);
  },

  render: function() {
    return (
      <View style={styles.container}>
        {this.renderTitle()}

        {this.renderName()}

        {this.renderCategories(categories)}

        {this.renderNext()}
      </View>
    );
  },

  renderTitle: function() {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Welcome
        </Text>
      </View>
    );
  },

  renderName: function() {
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
  },

  renderCategories: function(categories: Array) {
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
  },

  renderNext: function() {
    return (
      <View style={styles.nextContainer}>
        <TouchableOpacity style={styles.next} onPress={() => this.onNextPress()}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

});

let styles = StyleSheet.create({
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
