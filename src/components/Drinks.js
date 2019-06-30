import React, { Component } from 'react';

import { View, Text } from 'react-native';


class Drinks extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "DRINKS",
    headerTitleStyle: {
      marginHorizontal: 90,
      fontSize: 20,
      alignItems: 'center',
      color: 'red',
      fontWeight: 'bold'
    },
  })

  render() {
    return (
      <View>
        <Text>Drinks</Text>
      </View>
    );
  }
}

export default Drinks;