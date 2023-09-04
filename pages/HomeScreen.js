import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import ArrowSelectionScreen from "../pages/ArrowSelectionScreen.js";

function TestPageHome({ navigation, route }) {
  const { sum, distance, arrowValues, key } = route.params;
  const [newScoresList, setNewScoresList] = useState('');
  const [sumA10m, setSumA10m] = useState(0);
  const [numA10m, setNumA10m] = useState(0);
  const [sumA15m, setSumA15m] = useState(0);
  const [numA15m, setNumA15m] = useState(0);

  useEffect(() => {
    if (!(sum == null)) {
      let arrowValuesFormatted = "";
      for (let i = 0; i < 4; i++) {
        arrowValuesFormatted += arrowValues[i] + ", ";
      }
      arrowValuesFormatted += arrowValues[4];

      if (distance == "10m") {
        setSumA10m((prevSumA) => prevSumA + sum);
        setNumA10m((prevNumA) => prevNumA + 5);
      } else {
        setSumA15m((prevSumA) => prevSumA + sum);
        setNumA15m((prevNumA) => prevNumA + 5);
      }
      setNewScoresList(
        newScoresList + 
        '\nTotal: ' + sum + 
        '     Distance: ' + distance + 
        '     Arrows: ' + arrowValuesFormatted
      );
    }
  }, [key]);

  return (
    <SafeAreaView
      style = {styles.container}
    > 
      <ScrollView> 

    <View>
      <View
        style = {styles.viewStyle}
      >
        <Text>
          <Text style={styles.textStyle}>Archery Practice Tracker</Text>
          {"\n"}
          10m Round Average:{" "}
          { numA10m > 0 ? (sumA10m / numA10m * 5).toFixed(2) : "No 10m Rounds Yet"}
          {"\n"}
          15m Round Average:{" "}
          { numA15m > 0 ? (sumA15m / numA15m * 5).toFixed(2) : "No 15m Rounds Yet"}

          <Text style={styles.textStyle}>
            {((numA10m > 0) || (numA15m > 0)) ? "\n\nRecent Ends: ": ""}
          </Text>
          {newScoresList}
        </Text>
      </View>
      <TouchableOpacity
        style = {styles.buttonStyle}
        onPress = {
          () => navigation.navigate("TestPage")
        }> 
        <Text 
          style = {[styles.textStyle, {color: "white"}]}
        > Add Arrows </Text>
      </TouchableOpacity>
      <View
        style = {styles.viewStyle}
      > 
      <Button
        title = 'Clear'
        onPress = {() => {
          //reset recent & average
          setNewScoresList('');
          setSumA10m(0);
          setNumA10m(0);
          setSumA15m(0);
          setNumA15m(0);
        }}
      />
      </View>
    </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16, 
    fontWeight: "bold",
  }, 
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'blue',
    borderColor: 'blue',
    color: "white",
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    padding: 20,
  },
  viewStyle: {
    margin: 5,
  }, 
  container: {
    flex: 1,
  },
});
export default TestPageHome;