import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";

function TestPageHome({ navigation, route }) {
  const initialArrows = {
    sumA10m: 0,
    numA10m: 0,
    sumA15m: 0,
    numA15m: 0,
    num1010m: 0,
    num910m: 0,
    numOther10m: 0,
    num1015m: 0,
    num915m: 0,
    numOther15m: 0,
  };

  const { sum, distance, arrowValues, key } = route.params;
  const [newScoresList, setNewScoresList] = useState('');
  const [arrows, setArrows] = useState(initialArrows);
  
 
  reset = () => {
    setNewScoresList('');
    setArrows(initialArrows)
  };

  useEffect(() => {
    if (!(sum == null)) {
      const distanceKey = distance === "10m" ? "10m" : "15m";
      const arrowStats = { ...arrows };
      arrowStats[`sumA${distanceKey}`] += sum;
      arrowStats[`numA${distanceKey}`] += 5;

      for (let i = 0; i < 5; i++) {
        if (arrowValues[i] === 10) {
          arrowStats[`num10${distanceKey}`]++;
        } else if (arrowValues[i] === 9) {
          arrowStats[`num9${distanceKey}`]++;
        } else {
          arrowStats[`numOther${distanceKey}`]++;
        }
      }
      setArrows(arrowStats);

      const arrowValuesFormatted = arrowValues.join(", ");
      setNewScoresList(
        `${newScoresList}\nTotal: ${sum} Distance: ${distance} Arrows: ${arrowValuesFormatted}`
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
              {["10m", "15m"].map((index) => (
                <Text key={index}>
                  {index}:
                  {"\n"}Average:{" "}
                  { arrows[`numA${index}`] > 0 ? (arrows[`sumA${index}`] / arrows[`numA${index}`] * 5).toFixed(2) : ""}
                  {"\n"}% Tens:{" "}
                  { arrows[`numA${index}`] > 0 ? (arrows[`num10${index}`] / arrows[`numA${index}`] * 100) + "%": ""}
                  {"\n"}% Nines:{" "}
                  { arrows[`numA${index}`] > 0 ? (arrows[`num9${index}`] / arrows[`numA${index}`] * 100) + "%": ""}
                  {"\n"}% Other:{" "}
                  { arrows[`numA${index}`] > 0 ? (arrows[`numOther${index}`] / arrows[`numA${index}`]* 100) + "%": ""}
                  {"\n\n"}
                </Text>
              ))}
              <Text 
                style={styles.textStyle}
              >
                {((arrows.numA10m > 0) || (arrows.numA15m > 0)) ? "Recent Ends: ": ""}
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