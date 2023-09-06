import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ArrowSelector2 from '../src/components/ArrowSelector2/ArrowSelector2';
import { useNavigation } from '@react-navigation/native'; 

function TestPage() {
  const [sum, setSum] = useState(0); //Keep track of sum
  const [distance, setDistance] = useState(''); 
  const [distanceClicked, setDistanceClicked] = useState(false);
  const [arrowValues, setArrowValues] = useState(Array(5).fill(0)); //[0, 0, 0, 0, 0] -> Arrows in each row are set to 0 as default
  const [rowsToggledOn, setRowsToggledOn] = useState(Array(5).fill(false)); // Rows have not been toggled on to start
  const navigation = useNavigation(); 
  
  //Update the sum when buttons are clicked (when arrowValues changes)
  useEffect(() => {
    const newSum = arrowValues.reduce((acc, val) => acc + val, 0);
    setSum(newSum);
  }, [arrowValues]);

  const renderDistanceButtons = (selectedDistance) => {
    const buttons = [];

    for (let i = 10; i < 20; i += 5) {
      buttons.push(
        <TouchableOpacity
          key={i}
          onPress={() => {
            setDistance(i + 'm');
            setDistanceClicked(true);
          }}
          style={[
            styles.buttonStyle,
            selectedDistance === i + 'm' && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>{i + 'm'}</Text>
        </TouchableOpacity>
      );
    }

    return buttons;
  };

  const toggleRow = (rowIndex) => {    
    const newValues = [...rowsToggledOn];
    if (!newValues[rowIndex]) {
      newValues[rowIndex] = !newValues[rowIndex];
    }
    setRowsToggledOn(newValues);
  };

  const isSaveButtonEnabled = () => {
    return distanceClicked && rowsToggledOn.every((row) => row);
  };

  const saveValues = () => {
    const key = Date.now();
    navigation.navigate('Home', {
      sum,
      distance,
      arrowValues,
      key,
    });
  };

  return (
    <View>
      <Text>End Total: {sum}</Text>
      <Text>Distance: {distance}</Text>
      {[0, 1, 2, 3, 4].map((index) => (
        <View key={index}>
          <ArrowSelector2
            sum={arrowValues[index]}
            updateSum={(newSum) => {
              const newValues = [...arrowValues];
              newValues[index] = newSum;
              toggleRow(index);
              setArrowValues(newValues);
            }}
          />
        </View>
      ))}
      <View style={styles.distanceContainer}>
        {renderDistanceButtons(distance)}
      </View>
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          isSaveButtonEnabled()
            ? styles.buttonPressed
            : styles.buttonNotPressed,
        ]}
        onPress={saveValues}
        disabled={!isSaveButtonEnabled()}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  distanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'gray',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    padding: 10,
  },
  buttonPressed: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  buttonNotPressed: {
    backgroundColor: 'gray',
    borderColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TestPage;