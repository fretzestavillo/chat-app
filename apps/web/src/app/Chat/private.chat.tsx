import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from './socket';
import { PrivateContent } from './tools/type';

export function PrivateChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const FromLOgindata = location.state;
  const privatesender = FromLOgindata.FromLOgindata.result.firstName;
  const privaterecipient = FromLOgindata.recipient;
  const socket = useContext(WebsocketContext);
  const [newMessage, setNewMessage] = useState('');
  const [privateMessage, setPrivateMessage] = useState<PrivateContent[]>([]);
  

  

useEffect(() => {
    getList();
  }, []);

  const getList = async (): Promise<void> => {
    const senderfromhome = privatesender
    const recipientfromhome = privaterecipient
    const BaseUrl = 'http://localhost:3000/api/';
    const response = await fetch(`${BaseUrl}privatechat?sender=${senderfromhome}&recipient=${recipientfromhome}`);
    const result = await response.json();
    setPrivateMessage(result);
  };

  useEffect(() => {
    socket.on('private_message', (newMessage: PrivateContent) => {
      setPrivateMessage((prev) => [...prev, newMessage]);
    });

    return () => {
      console.log('Unregistering Events...');
      socket.off('private_chat');
      socket.off('private_message');
    };
  }, []);



  function onSubmit() {
    const sender = privatesender;
    const recipient = privaterecipient;
    const messageContent = newMessage;

    socket.emit('private_chat', {
      sender: sender,
      recipient: recipient,
      messageContent: messageContent,
    });
    setNewMessage('')

    socket.on('private_message', (data) => {
      setPrivateMessage((prev) => [...prev, data]);
    });

    // socket.off('private_chat')
    // socket.off('private_message')
  }

  return (
    <>
      <div>
        {privateMessage.map((data, index) => (
          <div key={index}>
            <p>{data.sender}: {data.messageContent} &nbsp;{' '}
                    {new Date(data.created_at).toLocaleString(undefined, {
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

      <div>
        <div>
          <h1>
            Welcome to private chat {privatesender},wanna start conversation with{' '}
            {privaterecipient}?
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