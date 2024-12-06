import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Inputs } from './tools/type';

export function OneChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const FromLOgindata = location.state;
  const myName = FromLOgindata.result.firstName;
  const socket = io('http://localhost:3002');
  const [messages, setMessages] = useState<Inputs[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('broadcastfromoneVone', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    !newMessage ? alert('Please put message') : 'fff';
    const data: Inputs = {
      name: myName,
      message: newMessage,
    };
    socket.emit('oneVone', data);
    setNewMessage('');
  };

  function groupChatButton() {
    navigate('/GroupChat', { state: { FromLOgindata } });
  }
  return (
    <>
      <div>
        <h1>One Vs One Chat: Welcome: {myName}</h1>
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
        <button onClick={groupChatButton}>GroupChat</button>
      </div>
    </>
  );
}
