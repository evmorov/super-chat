import React, { useState } from 'react';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';

export const AuthScreen = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const pressHandler = () => {
    if (value.trim()) onSubmit(value);
  };

  return (
    <View style={styles.auth}>
      <Text style={styles.text}>Enter your nickname</Text>
      <View style={styles.inputBlock}>
        <TextInput
          style={styles.input}
          onChangeText={setValue}
          value={value}
          placeholder="Your nickname"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Button title="Submit" onPress={pressHandler}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  auth: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 30,
  },
  inputBlock: {
    flexDirection: 'row',
  },
  input: {
    width: '70%',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    padding: 10,
    marginRight: 10,
  },
});
