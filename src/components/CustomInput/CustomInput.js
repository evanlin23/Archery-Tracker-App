import { Text, View, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'

const CustomInput = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder='placeholder'/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {

  },
})
export default CustomInput