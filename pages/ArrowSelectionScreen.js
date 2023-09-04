//Archive this; not used anymore. 
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import ArrowSelector from '../ArrowSelector.js'

function parsePassedData(numArrows) {
  //weighted sum of the arrows (index 0 = 10 points, etc)
  let sum = 0;
  for (let i = 0; i < numArrows.length; i++) {
    sum += (10-i) * numArrows[i]
  }
  return sum;
}

function saveArrowData() {
  //TODO -> connect to something to actually save (async?)
  return 0;
}

function combinedFunction({navigation}, sumScores, arrowValues, d) {
  saveArrowData(); //this is supposed to save to a database somewhere :shrug:

  const arrowID = Date.now();

  //stuff to send over to home screen
  navigation.navigate('Home', {
    paramKey: sumScores + arrowID,
    id: arrowID,
    valueOfArrows: arrowValues,
    distance: d,
  });
}

function sumArray(array) {
  let sum = 0;
  array.forEach(item => {
    sum += item;
  });
  return sum;
}

function updateArrowValues(arrowValues, newData) {
  //[-1, -1, -1, -1, -1] -> update this to add/remove an arrow
  //future me - don't touch this, it works but i'm not sure why
  let endArray = arrowValues
  if (sumArray(newData) === 1) {
    let numUpdated = 0;
    for (let i = 0; i < endArray.length; i++) {
      if (arrowValues[i] === -1 && numUpdated === 0) {
        endArray[i] = parsePassedData(newData)
        numUpdated = 1;
      }
    }
  } else {
    let placement = 0;
    for (let i = 0; i < arrowValues.length; i++) {
      if (arrowValues[i] > 0) {
        placement = i;
      }
    }
    endArray[placement] = -1
  }
  return endArray;
}

function ArrowSelectionScreen(navigation) {
  const [data, setData] = useState([0, 0, 0, 0, 0]);
  const [sumScores, setSumScores] = useState(0);
  const [numPositive, setNumPositive] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [arrowValues, setArrowValues] = useState([-1, -1, -1, -1, -1])
  const [distance, setDistance] = useState('');
  const [distanceClicked, setDistanceClicked] = useState(false)

  const childToParent = (childData) => {
    //save data
    const newData = childData;
    setData(newData);

    //update values of arrows
    const newArrowValues = updateArrowValues(arrowValues, newData)
    setArrowValues(newArrowValues)

    //enable button if have 5 
    const newNumPositive = numPositive + sumArray(newData)
    setNumPositive(newNumPositive)
    setButtonDisabled(newNumPositive === 5) 

    //find weighted sum 
    setSumScores(sumScores + parsePassedData(newData));
  } 

  //don't change the headings!
  //renders the 5 rows of buttons
  renderArrowSelectors = () => {
    const ArrowSelectors = [];
    for (let i = 0; i < 5; i++) {
      ArrowSelectors.push(
        <ArrowSelector 
          childToParent={childToParent}
          key={i}
        />
      )
    }
    return ArrowSelectors;
  }

  //renders the 10m, 15m buttons
  renderButtons = () => {
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
            styles.distanceButton,
            distance === i + 'm' ? styles.distanceButtonPressed : null,
          ]}
        >
          <Text style={styles.buttonText}>{i + 'm'}</Text>
        </TouchableOpacity>
      );
    }
    return buttons;
  }

  return (
    <View>
      <Text>
        End Total: {sumScores + '\t\t'}
        Distance: {distance}
      </Text>

      {this.renderArrowSelectors()}
      {this.renderButtons()}

      <Button
        title="Save"
        onPress={
          () => combinedFunction(navigation, sumScores, arrowValues, distance)
        }
        disabled = {!buttonDisabled || !distanceClicked}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  distanceButton: {
    backgroundColor: '#ccc', // Default color
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  distanceButtonPressed: {
    backgroundColor: '#007bff', // Pressed color
  },
  buttonText: {
    color: 'black', // Text color
  },
});

export default ArrowSelectionScreen;
