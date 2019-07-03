import React from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';


export default function Success() {

  return (
    <>
      <StatusBar hidden />
      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'cente', justifyContent: 'center' }}>
          <Text style={{ fontSize: 40, color: 'red' }}>Thank you</Text>
          <Text style={{ fontSize: 40, color: 'red' }}>for your order!</Text>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Success')} style={{ backgroundColor: 'red', height: 60 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} />
      </TouchableOpacity>
    </>
  );
}
