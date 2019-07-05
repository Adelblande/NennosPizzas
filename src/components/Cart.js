import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

import logoDrinks from '../assets/ic_drinks.png';


export default class Cart extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "CART",

    headerTitleStyle: {
      marginHorizontal: 90,
      fontSize: 20,
      alignItems: 'center',
      color: 'red',
      fontWeight: 'bold',
    },
    headerRight: (
      <TouchableOpacity onPress={() => { }}>
        <Image style={{ marginHorizontal: 10 }} source={logoDrinks} />
      </TouchableOpacity>
    ),
  });

  state = {
    cart: [],
    total: 0
  }

  async componentDidMount() {
    const cart = this.props.navigation.getParam('cart');
    await this.setState({ cart });
    const total = this.somaTotal();
    await this.setState({ total });
  }

  async cancelPizza(pizza) {
    const newCart = this.state.cart.filter(item => {
      return item.name !== pizza.name
    })
    await this.setState({ cart: newCart });
    const newTotal = this.somaTotal();
    this.setState({ total: newTotal });
  }
  somaTotal() {
    const total = this.state.cart.reduce((ac, item) => {
      return ac + item.valorPizza
    }, 0)
    return total;
  }

  render() {
    return (
      <>
        <ScrollView>
          {
            this.state.cart.map(pizza => (
              <TouchableOpacity onPress={() => { this.cancelPizza(pizza) }} key={pizza.name}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20 }}>
                  <Icon name="clear" type="material" color='red' />
                  <Text style={{ fontSize: 20, marginVertical: 10 }}>{pizza.name}</Text>
                  <Text>{`$${pizza.valorPizza}`}</Text>
                </View>
              </TouchableOpacity>
            ))
          }
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 20 }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', }}>TOTAL</Text>
            <Text style={{ fontSize: 26, fontWeight: 'bold', }}>${this.state.total}</Text>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Success')} style={{ backgroundColor: 'red', height: 60 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, color: '#FFF', marginVertical: 10 }}>CHECKOUT</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}
