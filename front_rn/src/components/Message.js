import React from 'react';
import { Text, View } from 'react-native';

export default class Message extends React.Component {
  render() {
    const { message, nickname, time } = this.props.message;

    return (
      <View>
        <Text>
          {time} {nickname}: {message}
        </Text>
      </View>
    );
  }
}
