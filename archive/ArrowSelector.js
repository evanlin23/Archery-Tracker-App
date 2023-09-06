import React, {useState} from 'react';
import { ScrollView, StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';

const initialTotals = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
]
const initialArrows = [
  false, false, false, false, false, false, false, false, false, false, false
]

export default function ArrowSelector({childToParent}) {
  const [thisToggled, setThisToggled] = useState(initialArrows);
  const [numArrows, setNumArrows] = useState(initialTotals);
  const [oneToggled, setOneToggled] = useState(false)

  //renders the 10 individual buttons (10 -> 1) for arrow values
  renderButtons = () => {
    const buttons = [];
    for(let i = 0; i <= 10; i++) {
      var title_name = String(10-i);
      if (i === 10) {
        title_name = "Miss";
      }
      
      buttons.push(
        <TouchableOpacity
          color = {'red'}
          key={i}
          style={[
            styles.scoreButton,
            thisToggled[i] ? styles.scoreButtonPressed : null,
          ]}
          onPress={() => handleArrowsClick(i)}
          title = {title_name}
          
        >
          <Text style={thisToggled[i] ? styles.buttonTextPressed : styles.buttonText}> 
            {String(title_name)}
          </Text>
        </TouchableOpacity>
      );
    }
    return buttons;
  }

  function handleArrowsClick(index) {
    //literally have no idea what this does, other than updating something when the buttons are clicked
    const newThisToggled = thisToggled.map((c, i) => {
      return i === index ? !c : c;
    });
    
    const newNumArrows = numArrows.map((c, i) => {
      return i === index ? (numArrows[i] === 1 ? -1 : 1) : 0;
    });

    setOneToggled(!oneToggled)
    setThisToggled(newThisToggled)
    setNumArrows(newNumArrows)
    childToParent(newNumArrows)
  }

  return  (
    <View style={styles.arrowContainer}>
      {this.renderButtons()}
    </View>
  );
};


const styles = StyleSheet.create({
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
  },
  scoreButton: {
    backgroundColor: '#ccc', // Default color
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreButtonPressed: {
    backgroundColor: '#007bff', // Pressed color
  },
  buttonText: {
    color: 'black', // Text color
  },
  buttonTextPressed: {
    color: 'black', // Text color when pressed
  },
});
