import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default class ComposeMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.setValue = this.setValue.bind(this);
    this.pressHandler = this.pressHandler.bind(this);
  }

  setValue(value) {
    this.setState({ value });
  }

  pressHandler() {
    const { value } = this.state;
    if (value.trim()) {
      this.props.onSubmit(value);
      this.setValue('');
    }
  }

  render() {
    return (
      <View style={styles.inputBlock}>
        <TextInput
          style={styles.input}
          onChangeText={this.setValue}
          value={this.state.value}
          placeholder="Write a message..."
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Button title="Send" onPress={this.pressHandler}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
