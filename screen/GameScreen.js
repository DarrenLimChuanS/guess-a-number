import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import NumberContainer from '../common/NumberContainer';
import Card from '../common/Card';

// Rendered once only when currentGuess state is not defined.
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  return randomNumber === exclude
    ? generateRandomBetween(min, max, exclude)
    : randomNumber;
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const [guessRounds, setGuessRounds] = useState(0);

  // useRef survives re-rendering to store value.
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // Extract properties from props into variable.
  const { userChoice, onGameOver } = props;
  // useEffect will run after every render cycle and when dependency list changes.
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(guessRounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setGuessRounds((currentGuessRounds) => currentGuessRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title='Lower' onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button
          title='Greater'
          onPress={nextGuessHandler.bind(this, 'greater')}
        />
      </Card>
    </View>
  );
};

// Component StyleSheet.
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
});

// Export the Component.
export default GameScreen;
