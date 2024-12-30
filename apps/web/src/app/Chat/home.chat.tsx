import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from './socket';
import { Item, RegisteredUsers } from './tools/type';
import '../../styles.css'; 



export function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const FromLOgindata = location.state;
  const myName = FromLOgindata.result.name;
  const userId = FromLOgindata.result.id;
  const token = FromLOgindata.result.access_token;
  const socket = useContext(WebsocketContext);
  const [registeredUsers, setregisteredUsers] = useState<RegisteredUsers[]>([]);
  
  const [activeUsers, setActiveUsers] = useState<Item[]>([])
  const uniqueArray = Array.from(
    new Map(activeUsers.map((user) => [user.name, user])).values()
  );




  useEffect(() => {
    getList();
  }, []);


  const getList = async (): Promise<void> => {
    socket.emit('register_user', myName);



    socket.on('getAllUsers', (data: RegisteredUsers[]) => {
      setregisteredUsers(data);
    });

     
    socket.on('activeUsers', (data: Item[]) => {

      setActiveUsers(data);
    });



  }

  function userOnline(recipient: string) {
     myName === recipient? alert('please dont touch yourself'): navigate('/PrivateChat', { state: { FromLOgindata, recipient } });
    
  }

  function oneChatButton() {
    navigate('/GroupChat', { state: { FromLOgindata } });
  }

  function statusCheck(name: string) {
    const userStatus = uniqueArray.find(data => data.name === name);
    return userStatus ? "online" : "offline";
  }

  return (
    <div>
      <div>
        <div>
        <h1>Welcome to main chat {myName}</h1>

       
        </div>



        <h1>Users</h1>
        {registeredUsers.map((user, index) => (
          <div>
            <button key={index} onClick={() => userOnline(user.firstName)}>
            {user.firstName} <div className={statusCheck(user.firstName)}></div>

          </button>
          </div>
          
        ))}
        <br />
        <button onClick={oneChatButton}>Group Chat</button>
      </div>
    </div>
  );
}
