import React, { Component } from 'react';
import { Modal, View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

import api from '../services/api';

import bgWoodCreate from '../assets/bg_wood_create.png';

export default class Create extends Component {
  static navigationOptions = () => ({
    title: "CREATE",
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
    buttonDisable: false,
    precoTotal: 0,
    checked: []
  }
  async componentDidMount() {
    const response = await api.get('/ozt3z');
    const check = []
    response.data.map(ingred => {
      check[ingred.name] = false
    })

    await this.setState({ ingredients: response.data, checked: check })
  }
  async setModalVisible(visible) {
    await this.setState({ modalVisible: visible });
  }
  async somaTotal(ingredient) {
    let isIngredient = this.state.checked;
    isIngredient[ingredient] = !isIngredient[ingredient];
    if (isIngredient[ingredient] === true) {
      await this.setState({ precoTotal: this.state.precoTotal + 5 })
    } else {
      await this.setState({ precoTotal: this.state.precoTotal - 5 })
    }
    await this.setState({ checked: isIngredient })
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
          <View style={{ height: 30, opacity: 0.7, backgroundColor: 'red', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: "#FFF", fontWeight: 'bold' }}>ADDED TO CART</Text>
          </View>
        </Modal>


        <ScrollView>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <ImageBackground source={bgWoodCreate} style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300 }} />
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', marginHorizontal: 20, marginVertical: 20 }}>Ingredients</Text>
              <View style={{ flex: 1, flexDirection: 'column' }}>

                {
                  this.state.ingredients.map(item => (
                    <TouchableOpacity key={item.id} onPress={() => this.somaTotal(item.name)}>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CheckBox
                          iconType="material"
                          iconStyle={{ marginVertical: 20 }}
                          checkedIcon="done"
                          uncheckedIcon="done"
                          checkedColor="red"
                          checked={this.state.checked[item.name]}
                        // onPress={() => this.isIngredient(item.name)}
                        />

                        <Text style={{ fontSize: 20 }}>{item.name}</Text>
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
