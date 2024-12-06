import Login from './authentication/login';
import SignUp from './authentication/signup';
import GroupChat from './Chat/group.chat';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OneChat } from './Chat/one.chat';

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/OneChat" element={<OneChat />} />
          <Route path="/GroupChat" element={<GroupChat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
