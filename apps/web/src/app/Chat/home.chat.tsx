import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from './socket';
import { RegisteredUsers } from './tools/type';

export function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const FromLOgindata = location.state;
  const myName = FromLOgindata.result.name;
  const userId = FromLOgindata.result.id;
  const token = FromLOgindata.result.access_token;
  const socket = useContext(WebsocketContext);
  const [registeredUsers, setregisteredUsers] = useState<RegisteredUsers[]>([]);
  
  
  ////////
  const [activeUsers, setActiveUsers] = useState<string[]>([])
  const uniqueArray = [...new Set(activeUsers)];









  useEffect(() => {
    getList();
  }, []);


  const getList = async (): Promise<void> => {
    socket.emit('register_user', myName);



    socket.on('getAllUsers', (data: RegisteredUsers[]) => {
      setregisteredUsers(data);
    });

     ////////
    socket.on('activeUsers', (data) => {
      setActiveUsers(data);
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
        <div>
        <h1>Welcome to main chat {myName}</h1>

        {uniqueArray.map((data)=>(
          <div>
            <p > {data}: is online</p>
          </div>
        ))}
        </div>



        <h1>Users</h1>
        {registeredUsers.map((user, index) => (
          <div>
            <button key={index} onClick={() => userOnline(user.firstName)}> {user.firstName}</button>
          </div>
        ))}
        <br />
        <button onClick={oneChatButton}>Group Chat</button>
      </div>
    </div>
  );
}
