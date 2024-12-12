import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
import { Inputs, MessageList } from './tools/type';
const socket = io('http://localhost:3002');

export function OneChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const FromLOgindata = location.state;
  const myName = FromLOgindata.result.firstName;
  let [messages, setMessages] = useState<MessageList[]>([]);
  let [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('getAlldata', (data) => {
      setMessages(data);
    });
  }, []);

  function sendMessage() {
    !newMessage ? alert('Please put message') : 'fff';
    const data: Inputs = {
      sender: myName,
      message: newMessage,
    };
    socket.emit('messageToServer', data);
    socket.off('messageToServer');

    socket.on('messageToClient', (fromDb) => {
      setMessages((prevMessages) => [...prevMessages, fromDb]);
    });

    setNewMessage('');
  }

  //   function groupChatButton() {
  //     navigate('/GroupChat', { state: { FromLOgindata } });
  //   }

  return (
    <>
      <div>
        <h1>One Vs One Chat: Welcome: {myName}</h1>
        <div className="chat">
          {messages.map((msg, index) => (
            <div key={index}>
              <p>
                {msg.sender}: {msg.message}: sent:{' '}
                {new Date(msg.created_at).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </p>
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
        {/* <button onClick={groupChatButton}>GroupChat</button> */}
      </div>
    </>
  );
}
