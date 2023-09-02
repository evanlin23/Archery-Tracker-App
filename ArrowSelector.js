import React, {useState} from 'react';
import { ScrollView, StyleSheet, View, Button } from 'react-native';

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
    for(let i = 0; i < 10; i++) {
       buttons.push(
          <Button
            color = {'red'}
            key={i}
            onPress={() => handleArrowsClick(i)}
            title = {String(10-i)}
            disabled={!thisToggled[i] && oneToggled}
          />
      )
    }
    buttons.push(
      <Button
        color = {'red'}
        key={10}
        onPress={() => handleArrowsClick(10)}
        title = {'Miss'}
        disabled={!thisToggled[10] && oneToggled}
      />
    )
    return buttons;
  }

  function handleArrowsClick(index) {
    //literally have no idea what this does, other than updating something when the buttons are clicked
    const newThisToggled = thisToggled.map((c, i) => {
      if (i === index) {
        return !c
      } else {
        return c
      }
    });

    const newNumArrows = numArrows.map((c, i) => {
      if (i === index) {
        if (numArrows[i] === 1) {
          return -1
        } else {
          return 1
        }
      } else {
        return 0
      }
    });

    setOneToggled(!oneToggled)
    setThisToggled(newThisToggled)
    setNumArrows(newNumArrows)
    childToParent(newNumArrows)
  }

  return  (
    <View style={styles.arrowContainer}>
      <ScrollView
        horizontal={true}
        >
        {this.renderButtons()}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  arrowContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
  }, 
});