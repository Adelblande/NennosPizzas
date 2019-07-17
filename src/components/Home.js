import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, Modal } from 'react-native';

import api from '../services/api';

import logoCart from '../assets/ic_cart_navbar.png';
import logoCartButton from '../assets/ic_cart_button.png';
import bgWood from '../assets/bg_wood.png';


export default class Pizzas extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: "NENNO'S PIZZAS",
    headerTitleStyle: {
      marginHorizontal: 45,
      fontSize: 20,
      alignItems: 'center',
      color: 'red',
      fontWeight: 'bold'
    },
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('Cart', { cart: navigation.state.params.cart })}>
        <Image style={{ marginHorizontal: 10 }} source={logoCart} />

      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Text style={{ marginHorizontal: 20, fontSize: 35, color: 'red' }}>+</Text>
      </TouchableOpacity>
    ),
  })

  state = {
    pizzas: [],
    ingredients: [],
    basePrice: null,
    modalVisible: false,
    cart: []
  }

  async componentDidMount() {
    const { data } = await api.get('/dokm7');
    const { basePrice } = data
    const res = await api.get('/ozt3z');

    data.pizzas.map(pizza => {
      pizza.ingr = []
      pizza.ingredients.map(item => {
        const ingCom = res.data.filter(item2 => {
          return item2.id === item
        })
        pizza.ingr.push(...ingCom)
      })

      const valorPizza = pizza.ingr.reduce((ac, elem) => {
        return ac + elem.price
      }, basePrice)

      const stringIngredientes = pizza.ingr.reduce((ac, elem) => {
        return ac + elem.name + ', '
      }, '')

      pizza.stringIngredientes = stringIngredientes.substr(0, stringIngredientes.length - 2) + '.';
      pizza.valorPizza = valorPizza
    })
    await this.setState({ basePrice: basePrice, pizzas: data.pizzas, ingredients: res.data })
  }

  async addCart(pizza) {
    await this.setState({ cart: [...this.state.cart, pizza] })
    this.props.navigation.setParams({ cart: [...this.state.cart] });
    this.setModalVisible(!this.state.modalVisible)
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onShow={() => setTimeout(() => {
            this.setState({ modalVisible: false })
          }, 3000)
          }
          onRequestClose={() => {
            Alert.alert('Problemas com o modal.');
          }}>
          <View style={{ height: 30, opacity: 0.8, backgroundColor: 'red', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: "#FFF", fontWeight: 'bold' }}>ADDED TO CART</Text>
          </View>
        </Modal>
        <ScrollView>
          {
            this.state.pizzas.map(pizza => {
              return (
                <View style={{ flexDirection: 'column' }} key={pizza.name}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('IngredientsAdded', { pizza: pizza, title: pizza.name })}>
                    <ImageBackground source={bgWood} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 130 }}>
                      <Image source={{ uri: pizza.imageUrl }} style={{ width: 350, height: 350 }} />
                    </ImageBackground>
                  </TouchableOpacity>

                  <View style={{ flex: 1, backgroundColor: '#FFF', opacity: 0.94, zIndex: 1, height: 90 }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginHorizontal: 10 }}>{pizza.name}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', marginLeft: 10, flexWrap: 'wrap' }}>
                        {
                          pizza.ingr.map(ingredient => (
                            <Text key={ingredient.name} style={{ fontSize: 16 }}>
                              {ingredient.name + ', '}
                            </Text>
                          ))
                        }
                      </View>
                      <TouchableOpacity onPress={() => this.addCart(pizza)}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 75, height: 40, borderRadius: 5, backgroundColor: 'yellow', marginHorizontal: 10, marginBottom: 10 }} >
                          <Image source={logoCartButton} style={{ width: 30, height: 30 }} />
                          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFF' }}>{`$${pizza.valorPizza}`}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
              )
            })
          }
        </ScrollView>
      </>
    );
  }
}
