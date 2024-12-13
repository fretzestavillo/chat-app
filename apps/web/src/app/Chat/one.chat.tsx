import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from './socket';

export function OneChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const FromLOgindata = location.state;
  const myName = FromLOgindata.result.firstName;
  const [onlineUser, setOnlineUser] = useState<string[]>([]);
  const socket = useContext(WebsocketContext);
  const [receivedSender, setReceivedFromSender] = useState('for private chat');
  const finalData = Array.from(new Set(onlineUser.map((item: any) => item)));
  console.log(FromLOgindata);

  useEffect(() => {
    getList();
  }, []);
  const getList = async (): Promise<void> => {
    socket.emit('getOnlineUser', myName);
    socket.emit('register_user', myName); // `fromUser` is the username of the current client
    socket.on('getOnlineUserfromserver', (newMessage: string[]) => {
      setOnlineUser(newMessage);
    });
  };

  function userOnline(name: any) {
    const fromUser = myName;
    const username = name;
    const message = '150 sent';

    socket.emit('private_chat', {
      from: fromUser,
      to: username,
      message: message,
    });
  }
  socket.on('private_message', (data) => {
    const message = data.message;
    setReceivedFromSender(message);
  });

  function groupChatButton() {
    navigate('/GroupChat', { state: { FromLOgindata } });
  }
  return (
    <>
      <h1>{receivedSender}</h1>
      <div>
        <div>
          <h1>Welcome to main chat {myName} </h1>
          {finalData.map((data, index) => (
            <div key={index}>
              <button onClick={() => userOnline(data)}>
                {data}: is online
              </button>
            </div>
          ))}
          <br />
          <button onClick={groupChatButton}>Group Chat</button>
        </div>
      </div>
    </>
  );
}
