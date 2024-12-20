import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from './socket';

export function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const FromLOgindata = location.state;
  const myName = FromLOgindata.result.firstName;
  const [onlineUser, setOnlineUser] = useState<string[]>([]);
  const socket = useContext(WebsocketContext);
  const finalData = Array.from(new Set(onlineUser.map((item: any) => item)));

  useEffect(() => {
    getList();
  }, []);
  const getList = async (): Promise<void> => {
    socket.emit('getOnlineUser', myName);
    socket.emit('register_user', myName);
    socket.on('getOnlineUserfromserver', (newMessage: string[]) => {
      setOnlineUser(newMessage);
    });
  };

  function userOnline(recipient: any) {
    navigate('/PrivateChat', { state: { FromLOgindata, recipient } });
  }

  function oneChatButton() {
    navigate('/GroupChat', { state: { FromLOgindata } });
  }

  return (
    <div>
      <div>
        <h1>Welcome to main chat {myName}</h1>
        {finalData.map((data, index) => (
          <div key={index}>
            <button onClick={() => userOnline(data)}>{data}: is online</button>
          </div>
        ))}
        <br />
        <button onClick={oneChatButton}>Group Chat</button>
      </div>
    </div>
  );
}
