import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import ArrowSelectionScreen from "../pages/ArrowSelectionScreen.js";

function HomeScreen({ navigation, route }) {
  const [lastRoundScores, setLastRoundScores] = useState([]);
  const [formattedScores, setFormattedScores] = useState('');
  const [newScoresList, setNewScoresList] = useState('');
  const [sumA, setSumA] = useState(0);
  const [numA, setNumA] = useState(0);

  React.useEffect(() => {
    if ((typeof route.params?.paramKey !== undefined) && (typeof route.params?.id !== undefined)) {
      const newScore = route.params?.paramKey - route.params?.id; //get round score
      if (!Number.isNaN(newScore)) {
        //for finding round average
        setSumA(sumA + newScore)
        setNumA(numA + 5)

        //formatting recent scores
        setNewScoresList(
          newScoresList + 
          '\nTotal: ' + newScore + 
          '     Distance: ' + route.params?.distance + 
          '     Arrows: ' + route.params?.valueOfArrows.sort(function(a, b){return b - a})
        );
      }
      
      //put all the scores into 1 array
      setLastRoundScores((lastRoundScores) => [
        ...lastRoundScores, 
        newScore,
      ]);
    }
  }, [route.params.paramKey]);

  return (
    <View 
      style={{
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center" ,
        backgroundColor: "#F9FBFC",
      }}
    >
      
      <Text>
        Round Average: {
          (numA > 0) 
            ? Math.round((sumA/numA * 5 + Number.EPSILON) * 100) / 100 //calc avg & round to 2 decimal places
            : 'No Arrows Yet'
          }
      </Text>

      <Text>
        Recent Scores: {newScoresList}
      </Text>

      <Button
        title = 'Go to Arrows'
        onPress = {
          () => navigation.navigate("ArrowSelectionScreen")
        }
      />
      <Button
        title = 'Go to SignInScreen'
        onPress = {
          () => navigation.navigate("SignInScreen")
        }
      />

      <Button
        title = 'Clear'
        onPress = {() => {
          //reset recent & average
          setNewScoresList('');
          setSumA(0);
          setNumA(0);
        }}
      />
    </View>
  );
}

export default HomeScreen;

