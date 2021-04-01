import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <Text>Number of rounds: {props.guessRounds}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title='New Game' onPress={props.onNewGame} />
    </View>
  );
};

// Component StyleSheet.
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Export the Component.
export default GameOverScreen;
