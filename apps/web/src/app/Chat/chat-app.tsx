import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Inputs } from './tools/type';
import { generate, nameList } from './tools/name';

const socket = io('http://localhost:3002');

const ChatComponents = () => {
  const [messages, setMessages] = useState<Inputs[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('client', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    const firstName = generate();
    const data: Inputs = {
      name: firstName,
      message: newMessage,
    };
    socket.emit('client', data);
    setNewMessage('');
  };

  return (
    <div>
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
