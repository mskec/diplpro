'use strict';

import _ from 'underscore';
import React from 'react-native';
const {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} = React;

import Alert from '../Alert';
import Button from '../Button';
import {appColors} from '../AppConstants';
import AppStorage from '../storage/AppStorage';
import VBStorage from '../storage/VBStorage';



class SettingsScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      categories: []
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onCategoryPress = this.onCategoryPress.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    VBStorage.getCategories()
      .then((categories) => {
        this.setState(Object.assign(this.state, {categories}));

        return AppStorage.user().categories();
      })
      .then((userCategories) => {
        _.each(this.state.categories, (category) => {
          category._selected = _.contains(userCategories, category._id);
        });

        this.forceUpdate();
      });

    AppStorage.user().name()
      .then((name) => {
        this.setState(Object.assign(this.state, {name}));
      });
  }

  onNameChange(name: String) {
    this.setState(Object.assign(this.state, {name}));
  }

  onCategoryPress(category: Object) {
    category._selected = !category._selected;

    this.forceUpdate();
  }

  onSave() {
    const nameValid = this.state.name && /^\w+$/.test(this.state.name.trim());
    if (nameValid) {
      AppStorage.user().setName(this.state.name.trim());
    }

    const selectedCategories = _.filter(this.state.categories, category => category._selected);
    if (selectedCategories.length > 0) {
      AppStorage.user().setCategories(selectedCategories);
    }

    Alert.show('Saved!');
  }

  render() {
    return (
      <View style={s.container}>
        {this.renderName()}

        {this.renderCategories(this.state.categories)}

        {this.renderSave()}
      </View>
    );
  }

  renderName() {
    return (
      <View style={s.nameContainer}>
        <Text style={s.title}>Name</Text>
        <TextInput
          style={s.nameInput}
          onChangeText={this.onNameChange}
          value={this.state.name}
        />
      </View>
    );
  }

  renderCategories(categories: Array) {
    return (
      <View style={s.categoriesContainer}>
        <Text style={s.title}>Categories</Text>
        <View style={s.categories}>
          {_.map(categories, (category, idx) => this.renderCategory(category, idx))}
        </View>
      </View>
    );
  }

  renderCategory(category: Object, idx: Number) {
    return (
      <TouchableOpacity
        key={idx}
        onPress={() => this.onCategoryPress(category)}
        style={[s.category, category._selected && s.categorySelected]}
      >
        <Text style={[s.categoryText, category._selected && s.categoryTextSelected]}>
          {category.label}
        </Text>
      </TouchableOpacity>
    );
  }

  renderSave() {
    return (
      <View style={s.saveContainer}>
        <Button
          onPress={this.onSave}
          text="Save"
          textStyle={buttonStyles.text}
          wrapperStyle={buttonStyles.wrapper}
        />
      </View>
    );
  }
}

// Do not add this to styles below
const buttonStyles = {
  wrapper: {
    borderWidth: 1,
    borderColor: appColors.borderGrey,
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    color: appColors.fontColor,
    fontSize: 16
  }
};

const screenStyles = {
  container: {
    flex: 1,
    margin: 15
  },
  title: {
    color: appColors.fontColor,
    fontSize: 18,
    marginBottom: 15
  },
  saveContainer: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const nameStyles = {
  nameContainer: {
    //marginTop: Platform.OS === 'ios' ? 75 : 45,
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
  }
};

const categoriesStyles = {
  categoriesContainer: {
    marginTop: 35
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
  }
};

const s = StyleSheet.create(Object.assign({}, screenStyles, nameStyles, categoriesStyles));

AppRegistry.registerComponent('SettingsScreen', () => SettingsScreen);

export default SettingsScreen;
