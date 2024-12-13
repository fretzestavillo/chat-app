import { useLocation, useNavigate } from 'react-router-dom';
import { Inputs, MessageList } from './tools/type';
import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from './socket';

export function OneChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const FromLOgindata = location.state;
  const myName = FromLOgindata.result.firstName;
  const [messages, setMessages] = useState<MessageList[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUser, setOnlineUser] = useState<string[]>([]);
  const socket = useContext(WebsocketContext);
  const finalData = Array.from(new Set(onlineUser.map((item: any) => item)));

  useEffect(() => {
    getList();
  }, []);
  const getList = async (): Promise<void> => {
    const BaseUrl = 'http://localhost:3000/api/';
    const response = await fetch(`${BaseUrl}chat`);
    const result = await response.json();
    setMessages(result);

    socket.emit('getOnlineUser', myName);
    socket.emit('register_user', myName); // `fromUser` is the username of the current client
    socket.on('getOnlineUserfromserver', (newMessage: string[]) => {
      setOnlineUser(newMessage);
    });
  };

  useEffect(() => {
    socket.on('messageToClient', (newMessage: MessageList) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      console.log('Unregistering Events...');
      socket.off('messageToServer');
      socket.off('messageToClient');
    };
  }, []);

  const onSubmit = () => {
    !newMessage ? alert('Please put message') : 'fff';
    const data: Inputs = {
      sender: myName,
      message: newMessage,
    };
    socket.emit('messageToServer', data);
    setNewMessage('');
  };

  function userOnline(name: any) {
    const fromUser = myName;
    const username = name;
    const message = 'bitch';

    socket.emit('private_chat', {
      from: fromUser,
      to: username,
      message: message,
    });

    socket.on('private_message', (data) => {
      const { sender, message } = data;
      alert(message);
    });
  }
  return (
    <>
      <div>
        <div>
          <h1>Welcome {myName} </h1>
          {finalData.map((data, index) => (
            <div key={index}>
              <button onClick={() => userOnline(data)}>
                {data}: is online
              </button>
            </div>
          ))}
          <div>
            <div>
              {messages.map((msg, index) => (
                <div key={index}>
                  <p>
                    {msg.sender}: {msg.message}: &nbsp;{' '}
                    {new Date(msg.created_at).toLocaleString(undefined, {
                      // year: 'numeric',
                      // month: 'long',
                      // day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </p>
                </div>
              ))}
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
        </div>
      </div>
    </>
  );
}
