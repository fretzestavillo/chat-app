import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Inputs } from './tools/type';
import { useLocation } from 'react-router-dom';

const GroupChat = () => {
  const location = useLocation();
  const data = location.state;
  const myName = data.FromLOgindata.result.firstName;
  const socket = io('http://localhost:3002');

  const [messages, setMessages] = useState<Inputs[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('broadcastfromGC', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    const data: Inputs = {
      name: myName,
      message: newMessage,
    };
    socket.emit('groupChat', data);
    setNewMessage('');
  };

  return (
    <div>
      <h1>Group Chat: Welcome: {myName}</h1>
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

export default GroupChat;
