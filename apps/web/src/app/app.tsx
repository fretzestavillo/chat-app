import Login from './authentication/login';
import SignUp from './authentication/signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OneChat } from './Chat/one.chat';
import { GroupChat } from './Chat/group.chat';

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
