import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './pages/HomeScreen.js'
import TestPage from './pages/TestPage.js'
import AnalyticsScreen from './pages/AnalyticsScreen.js'
import SignInScreen from './src/screens/SignInScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>{
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }}
          initialParams={{paramKey: 0}}
        />
        <Stack.Screen 
          name="TestPage" 
          options={{ title: 'Add Arrow Scores' }}
          component={TestPage}
        />
        <Stack.Screen 
          name="AnalyticsScreen" 
          options={{ title: 'Statistics' }}
          component={AnalyticsScreen}
        />
      </Stack.Navigator>
    }</NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05C4B2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainer: {
    flexDirection: 'row',
    backgroundColor: '#258A66',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  }
});
