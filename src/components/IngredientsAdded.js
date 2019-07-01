import React, { Component } from 'react';
import { Modal, View, Text, ImageBackground, Image, ScrollView, TouchableOpacity } from 'react-native';

import api from '../services/api';

import bgWood from '../assets/bg_wood.png';

export default class IngredientsAdded extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
    headerTitleStyle: {
      marginHorizontal: 80,
      fontSize: 20,
      color: 'red',
      fontWeight: 'bold'
    },
  })
  state = {
    pizza: {},
    ingredients: [],
    modalVisible: false,
    precoTotal: 0,
  }
  async componentDidMount() {
    const pizza = this.props.navigation.getParam('pizza')
    const response = await api.get('/ozt3z');
    this.setState({ pizza: pizza, ingredients: response.data })
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  async somaTotal() {
    await this.setState({ precoTotal: this.state.precoTotal + 5 })
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
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <ImageBackground source={bgWood} style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300 }}>
              <Image source={{ uri: this.state.pizza.imageUrl }} style={{ width: 300, height: 300 }} />
            </ImageBackground>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', marginHorizontal: 20, marginVertical: 20 }}>Ingredients</Text>
              <View style={{ flex: 1, flexDirection: 'column', marginBottom: 20 }}>
                {
                  this.state.ingredients.map(item => (
                    <TouchableOpacity key={item.id} onPress={() => this.somaTotal()}>
                      <View key={item.id} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ marginHorizontal: 60, fontSize: 20 }}>{item.name}</Text>
                        <Text style={{ marginHorizontal: 10, fontSize: 20 }}>{`$5`}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                }
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)} style={{ backgroundColor: 'yellow', height: 60 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, color: '#FFF' }}>ADD TO CART {`($${this.state.precoTotal})`}</Text>
          </View>
        </TouchableOpacity>

      </>
    );
  }
}
