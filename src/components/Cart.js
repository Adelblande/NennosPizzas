import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';



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
  }

  async componentDidMount() {
    const cart = this.props.navigation.getParam('cart');
    await this.setState({ cart });
  }

  render() {
    return (
      <>
        <ScrollView>
          {
            this.state.cart.map(pizza => (
              <TouchableOpacity onPress={() => { }} key={pizza.name}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20 }}>
                  <Text style={{ fontSize: 20, marginVertical: 10 }}>{pizza.name}</Text>
                  <Text>{`$${pizza.valorPizza}`}</Text>
                </View>
              </TouchableOpacity>
            ))
          }
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
