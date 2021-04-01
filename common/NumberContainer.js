import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Color from '../constant/Color';

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

// Component StyleSheet.
const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Color.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: Color.accent,
    fontSize: 22,
  },
});

// Export the Component.
export default NumberContainer;
