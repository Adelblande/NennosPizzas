import React, { Component } from 'react';

import { View, Text } from 'react-native';

export default class Create extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "CREATE",
    headerTitleStyle: {
      marginHorizontal: 80,
      fontSize: 20,
      alignItems: 'center',
      color: 'red',
      fontWeight: 'bold'
    },
  })

  render() {
    return (
      <View>
        <Text>CREATE</Text>
      </View>
    );
  }
}
