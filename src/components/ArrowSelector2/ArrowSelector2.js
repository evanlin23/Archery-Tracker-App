import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

class ArrowSelector2 extends Component {
  constructor(props) {
    super(props);

    //All buttons off
    this.state = {
      selectedButton: -1, 
    };
  }

  sendSelectedButton = (buttonIndex) => {
    this.props.onSelectedButton(buttonIndex);
  };

  handleButtonPress = (buttonValue) => {
    const { selectedButton } = this.state;
    let newSum = 0;
    if (selectedButton !== buttonValue) {
      // Turn on new button and turn off the rest
      if (selectedButton !== -1) {
        newSum = this.props.sum - selectedButton + buttonValue
      } else {
        newSum = this.props.sum + buttonValue;
      }
      this.setState({ selectedButton: buttonValue });
      this.props.updateSum(newSum);
    }
  };

  renderButtons = () => {
    const buttons = [];

    for (let i = 10; i >= 0; i--) {
      let colorOfButton = "white";
      switch(i) {
        case 3:
        case 4:
          colorOfButton = "black";
          break;
        case 5:
        case 6:
          colorOfButton = "dodgerblue";
          break;
        case 7:
        case 8:
          colorOfButton = "red";
          break;
        case 9:
        case 10:
          colorOfButton = "yellow";
          break;
        default:
          colorOfButton = "white";
      }
      buttons.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.button,
            this.state.selectedButton === i && styles.selectedButton,
            this.state.selectedButton === i && {backgroundColor: colorOfButton},
          ]}
          onPress={() => this.handleButtonPress(i)}
        >
          <Text style = {[
            styles.buttonText,
            this.state.selectedButton === i && (i === 3 || i === 4 ) && {color: "white"},
          ]}> {i}</Text>
        </TouchableOpacity>
      );
    }

    return buttons;
  };

  render() {
    return (
      <View>
        <View style={styles.container}>{this.renderButtons()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
  },
  selectedButton: {
    backgroundColor: 'yellow', 
  },
  buttonText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ArrowSelector2;