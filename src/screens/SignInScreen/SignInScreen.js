import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import Logo from '../../../assets/images/plagiarism.png'
import CustomInput from '../../components/CustomInput'

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  return (
    <View style = {styles.root}>
      <Image source = { Logo } style = {[styles.logo, {height: height * 0.3}]} resizeMode = "contain" />
      <CustomInput />
    </View>
  )
}


const styles = StyleSheet.create({
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 300,
    height: 100,
  }, 
  root: {
    alignItems : 'center',
    padding: 20,
  }
})
export default SignInScreen