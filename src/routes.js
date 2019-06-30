import React from 'react';
import { Text } from 'react-native';

import { createAppContainer, createStackNavigator } from 'react-navigation';

import Home from './components/Home';
import Cart from './components/Cart';
import Drinks from './components/Drinks';
import Create from './components/Create';
import IngredientsAdded from './components/IngredientsAdded';



export default createAppContainer(
  createStackNavigator({
    Home,
    Cart,
    Drinks,
    Create,
    IngredientsAdded
  }, {
      defaultNavigationOptions: {
        headerTintColor: 'red',
        headerBackTitle: null
      },
      mode: 'modal'
    })
)