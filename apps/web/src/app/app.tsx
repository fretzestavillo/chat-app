import Login from './authentication/login';
import SignUp from './authentication/signup';
import ChatComponents from './Chat/chat-app';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ChatComponents" element={<ChatComponents />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
