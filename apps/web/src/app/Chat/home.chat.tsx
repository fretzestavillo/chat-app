import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from './socket';
import {  RegisteredUsers } from './tools/type';

export function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const FromLOgindata = location.state;
  const myName = FromLOgindata.result.name;
  const userId = FromLOgindata.result.id;
  const token = FromLOgindata.result.access_token;
  const [onlineUser, setOnlineUser] = useState<string[]>([]);
  const socket = useContext(WebsocketContext);
  const finalData = Array.from(new Set(onlineUser.map((item: any) => item)));
  const [registeredUsers, setregisteredUsers] = useState<RegisteredUsers[]>([]);

  console.log(myName, 'from login')
  console.log(userId, 'from login')
  console.log(token, 'from login')
  
  


  useEffect(() => {
    getList();
  }, []);
  const getList = async (): Promise<void> => {
    socket.emit('getOnlineUser', myName);
    socket.emit('register_user', myName);
   


    socket.on(' ', (newMessage: string[]) => {
      setOnlineUser(newMessage);
    });

    socket.on('getAllUsers', (data: RegisteredUsers[]) => {
      setregisteredUsers(data);
    });

  }

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

        <h1>Users</h1>
        {registeredUsers.map((user, index)=>(
          <div>
          <button key={index} onClick={()=>userOnline(user.firstName)}> {user.firstName}</button>
          </div>
        ))}
        <br />
        <button onClick={oneChatButton}>Group Chat</button>
      </div>
    </div>
  );
}
