import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

function ScoreScreen({navigation}) {
  const [numTens, setNumTens] = useState(0);
  const [numNines, setNumNines] = useState(0);
  const [totalArrows, setTotalArrows] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [roundFinished, setRoundFinished] = useState(false);
  
  return (
    <View style={styles.container}>
      <Text>Total Score: {totalScore}</Text>
      <Text>Arrows Shot: {totalArrows}</Text>
      <View style = {styles.arrowContainer}>
        <Text>Tens: </Text>
          <Button
            onPress={ () => {
              setNumTens(numTens + 1)
              setTotalArrows(totalArrows + 1)
              setTotalScore(totalScore + 10)
            }}
            disabled={totalArrows >= 30}
            title = {"+"}
          />

          <Button
            onPress={ () => {
              setNumTens(numTens - 1)
              setTotalArrows(totalArrows - 1)
              setTotalScore(totalScore - 10)
            }}
            disabled={numTens <= 0}
            title = {"-"}
          />
      </View>
      

      <View style = {styles.arrowContainer}>
        <Text>Nines: </Text>
          <Button
            onPress={ () => {
              setNumNines(numNines + 1)
              setTotalArrows(totalArrows + 1)
              setTotalScore(totalScore + 9)
            }}
            disabled={totalArrows >= 30}
            title = {"+"}
          />

          <Button
            onPress={ () => {
              setNumNines(numNines - 1)
              setTotalArrows(totalArrows - 1)
              setTotalScore(totalScore - 9)
            }}
            disabled={numNines <= 0}
            title = {"-"}
          />
      </View>

        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
        <StatusBar style="auto" />
        
      </View>
  );
}
export default ScoreScreen;

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
  }
});