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
  const socket = useContext(WebsocketContext);

  useEffect(() => {
    socket.on('messageToClient', (newMessage: MessageList) => {
      console.log(newMessage, 'dddddddddddddddd');
      setMessages((prev) => [...prev, newMessage]);
    });
    socket.on('getAlldata', (allData) => {
      allData.map((data: MessageList) => {
        console.log(data, 'wwwwwwwwwwwwwww');
        setMessages((prev) => [...prev, data]);
      });
    });
    return () => {
      console.log('Unregistering Events...');
      socket.off('messageToServer');
      socket.off('messageToClient');
      socket.off('getAlldata');
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

  return (
    <>
      <div>
        <div>
          <h1>Welcome {myName} </h1>
          {/* <div>
            {messages.length === 0 ? (
              <div>No Messages</div>
            ) : (
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
            )}
          </div> */}
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
