import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';


export default class Success extends Component {
  static navigationOptions = () => ({
    header: null
  })
  theEnd() {
    // this.props.navigation.setParams({ cart: [] });
    this.props.navigation.navigate('Home', { cart: [] });
  }
  render() {

    return (
      <>
        <StatusBar hidden />
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 40, color: 'red' }}>Thank you</Text>
          <Text style={{ fontSize: 40, color: 'red' }}>for your order!</Text>
        </View>
        <TouchableOpacity onPress={() => this.theEnd()} style={{ backgroundColor: 'red', height: 60 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} />
        </TouchableOpacity>
      </>
    );
  }
}
