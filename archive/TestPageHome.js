import React from 'react';
import { View, Text } from 'react-native';

function TestPageHome({ route }) {
  const { sum, distance, arrowValues } = route.params;

  return (
    <View>
      <Text>Sum: {sum}</Text>
      <Text>Distance: {distance}</Text>
      <Text>Arrow Values:</Text>
      {arrowValues.map((value, index) => (
        <Text key={index}>Arrow {index + 1}: {value}</Text>
      ))}
    </View>
  );
}

export default TestPageHome;