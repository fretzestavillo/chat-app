import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from './socket';

export function PrivateChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const FromLOgindata = location.state;
  const myName = FromLOgindata.FromLOgindata.result.firstName;
  const recepientName = FromLOgindata.name;
  const socket = useContext(WebsocketContext);
  const [newMessage, setNewMessage] = useState('');
  const [newValue, setnewValue] = useState<string[]>([]);

  function onSubmit() {
    const fromUser = myName;
    const sender = recepientName;
    const message = newMessage;

    socket.emit('private_chat', {
      from: fromUser,
      to: sender,
      message: message,
    });

    socket.on('private_message', (newMessage) => {
      setnewValue((prev) => [...prev, newMessage]);
    });
  }

  newValue.map((data) => console.log(data));
  return (
    <>
      <div>
        {newValue.map((data, index) => (
          <div key={index}>
            <p>{data}</p>
          </div>
        ))}
      </div>

      <div>
        <div>
          <h1>
            Welcome to private chat {myName},wanna start conversation with{' '}
            {recepientName}?
          </h1>

          <br />
        </div>
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={onSubmit}>Submit</button>
      </div>
    </>
  );
}
