import React from 'react';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import Message from '../components/Message';

export default class ChatScreen extends React.Component {
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
    if (value.trim()) this.props.onSubmit(value);
    this.setState({ value: '' });
  }

  render() {
    const { messages } = this.props;

    return (
      <View style={styles.chat}>
        {messages.map((message) => {
          const key = `${message.nickname}-${message.time}`
          return <Message message={message} key={key} />
        })}

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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chat: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
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
