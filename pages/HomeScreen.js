import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import PieChart from 'react-native-pie-chart'

import ArrowSelectionScreen from "../pages/ArrowSelectionScreen.js";

function TestPageHome({ navigation, route }) {
  const { sum, distance, arrowValues, key } = route.params;
  const [newScoresList, setNewScoresList] = useState('');
  const [sumA10m, setSumA10m] = useState(0);
  const [numA10m, setNumA10m] = useState(0);
  const [sumA15m, setSumA15m] = useState(0);
  const [numA15m, setNumA15m] = useState(0);

  const [num1010m, setNum1010m] = useState(0);
  const [num910m, setNum910m] = useState(0);
  const [numOther10m, setNumOther10m] = useState(0);

  const [num1015m, setNum1015m] = useState(0);
  const [num915m, setNum915m] = useState(0);
  const [numOther15m, setNumOther15m] = useState(0);

  reset = () => {
    setNewScoresList('');
    setSumA10m(0);
    setNumA10m(0);
    setSumA15m(0);
    setNumA15m(0);

    setNum1010m(0);
    setNum910m(0);
    setNumOther10m(0);

    setNum1015m(0);
    setNum915m(0);
    setNumOther15m(0);
  };

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

        for (let i = 0; i <= 4; i++) {
          if (arrowValues[i] == 10) {
            setNum1010m((num1010m) => num1010m + 1);
          } else if (arrowValues[i] == 9) {
            setNum910m((num910m) => num910m + 1);
          } else {
            setNumOther10m((numOther10m) => numOther10m + 1);
          }
        }
      } else {
        setSumA15m((prevSumA) => prevSumA + sum);
        setNumA15m((prevNumA) => prevNumA + 5);

        for (let i = 0; i <= 4; i++) {
          if (arrowValues[i] == 10) {
            setNum1015m((num1015m) => num1015m + 1);
          } else if (arrowValues[i] == 9) {
            setNum915m((num915m) => num915m + 1);
          } else {
            setNumOther15m((numOther15m) => numOther15m + 1);
          }
        }
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
              <Text 
                style={styles.textStyle}
              >
                Archery Practice Tracker
              </Text>
              {"\n"}
                <Text> 
                  10m:
                  {"\n"}Average:{" "}
                  { numA10m > 0 ? (sumA10m / numA10m * 5).toFixed(2) : ""}
                  {"\n"}% Tens:{" "}
                  { numA10m > 0 ? (num1010m / numA10m * 100) + "%": ""}
                  {"\n"}% Nines:{" "}
                  { numA10m > 0 ? (num910m / numA10m * 100) + "%": ""}
                  {"\n"}% Other:{" "}
                  { numA10m > 0 ? (numOther10m / numA10m * 100) + "%": ""}
                  {"\n\n"}
                </Text>
                <Text>
                  15m:
                  {"\n"}Average:{" "}
                  { numA15m > 0 ? (sumA15m / numA15m * 5).toFixed(2): ""}
                  {"\n"}% Tens:{" "}
                  { numA15m > 0 ? (num1015m / numA15m * 100) + "%": ""}
                  {"\n"}% Nines:{" "}
                  { numA15m > 0 ? (num915m / numA15m * 100) + "%": ""}
                  {"\n"}% Other:{" "}
                  { numA15m > 0 ? (numOther15m / numA15m * 100) + "%": ""}
                </Text>
              <Text 
                style={styles.textStyle}
              >
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
            > 
              Add Arrows 
            </Text>
          </TouchableOpacity>
          <View
            style = {styles.viewStyle}
          > 
            <Button
              title = 'Clear'
              onPress = {() => {
                //reset recent & average
                reset();
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
  statContainer: {
    flexDirection: "column",
    margin: 10,
    padding: 10,
  },
});
export default TestPageHome;