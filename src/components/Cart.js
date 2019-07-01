import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import logoDrinks from '../assets/ic_drinks.png';


export default class Cart extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "CART",
    headerTitleStyle: {
      marginHorizontal: 90,
      fontSize: 20,
      alignItems: 'center',
      color: 'red',
      fontWeight: 'bold'
    },
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('Drinks')}>
        <Image style={{ marginHorizontal: 10 }} source={logoDrinks} />
      </TouchableOpacity>
    )
  });

  state = {
    cart: []
  }

  async componentDidMount() {
    console.log(this.props.navigation)
    // const cart = this.props.navigation.getParam('cart');
    // await this.setState({ cart });
  }
  render() {
    return (
      <View>
        <Text>CART</Text>
      </View>
    );
  }
}
