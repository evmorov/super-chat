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
    };
    this.subscribe = this.subscribe.bind(this);
  }

  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const event = data[3];
      const { response, _status } = data[4];

      switch (event) {
        case 'phx_reply':
          this.handleReply(response);
          break;
      }
    };
  }

  handleReply(response) {
    if (response.user_id) {
      this.setState({ current_user_id: response.user_id });
    } else if (response.message_id) {
    }
  }

  sendMessage(event, payload) {
    const msg = [null, null, CHANNEL, event, payload];
    this.ws.send(JSON.stringify(msg));
  }

  subscribe(nickname) {
    this.sendMessage('phx_join', { nickname });
  }

  render() {
    let screen = <AuthScreen onSubmit={this.subscribe} />;
    if (this.state.current_user_id) {
      screen = <ChatScreen />;
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
