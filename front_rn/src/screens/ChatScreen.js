import React from 'react';
import { StyleSheet, View } from 'react-native';
import Message from '../components/Message';
import ComposeMessage from '../components/ComposeMessage';

export default class ChatScreen extends React.Component {
  render() {
    const { messages } = this.props;

    return (
      <View style={styles.chat}>
        {messages.map((message) => {
          const key = `${message.nickname}-${message.time}`;
          return <Message message={message} key={key} />;
        })}

        <ComposeMessage onSubmit={this.props.onSubmit} />
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
});
