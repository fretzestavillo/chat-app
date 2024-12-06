import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Inputs } from './tools/type';
import { useLocation } from 'react-router-dom';

const ChatComponents = () => {
  const location = useLocation();
  const FromLOgindata = location.state;
  const myName = FromLOgindata.result.firstName;

  const socket = io('http://localhost:3002');

  const [messages, setMessages] = useState<Inputs[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('server', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    const data: Inputs = {
      name: myName,
      message: newMessage,
    };
    socket.emit('client', data);
    setNewMessage('');
  };

  return (
    <div>
      <h1>G Chat</h1>
      <div className="chat">
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.name}: {msg.message}
          </div>
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponents;
