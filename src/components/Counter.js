import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, Button, StyleSheet } from 'react-native';
import { increment, decrement } from '../redux/counterSlice';

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50, 
    padding: 10,
  },
});
