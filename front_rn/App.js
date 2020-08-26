import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthScreen } from './src/screens/AuthScreen';
import ChatScreen from './src/screens/ChatScreen';

const URL = 'ws://localhost:4000/socket/websocket?vsn=2.0.0';
const CHANNEL = 'room:lobby';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_user_id: null,
      messages: [],
    };

    this.subscribe = this.subscribe.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const event = data[3];
      const response_data = data[4];

      switch (event) {
        case 'phx_reply':
          this.handleReply(response_data);
          break;
        case 'new_message':
          this.handleNewMessage(response_data);
          break;
      }
    };
  }

  handleReply({ response }) {
    if (response.user_id) {
      this.setState({ current_user_id: response.user_id });
    } else if (response.message_id) {
      // this.setState({ my_messages_ids: [...my_messages_ids, response.message_id] });
    }
  }

  handleNewMessage({ message, nickname, time }) {
    this.setState({
      messages: [...this.state.messages, { message, nickname, time }]
    })
  }

  sendSocketMessage(event, payload) {
    const msg = [null, null, CHANNEL, event, payload];
    this.ws.send(JSON.stringify(msg));
  }

  subscribe(nickname) {
    this.sendSocketMessage('phx_join', { nickname });
  }

  sendMessage(message) {
    this.sendSocketMessage('new_message', { message });
  }

  render() {
    let screen = <AuthScreen onSubmit={this.subscribe} />;
    if (this.state.current_user_id) {
      screen = <ChatScreen messages={this.state.messages} onSubmit={this.sendMessage} />;
    }

    return (
      <View style={styles.app}>
        <View style={styles.container}>{screen}</View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});
