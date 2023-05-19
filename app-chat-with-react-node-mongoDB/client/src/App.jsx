import {Routes, Route, Navigate} from "react-router-dom";
import Chat from "./pages/Chat";
import LoginRegister from "./pages/LoginRegister";
import Register from "./pages/Register";
import { Container } from 'react-bootstrap';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

  const {user} = useContext(AuthContext);

  return (
    <Container className="text-secondry">
      <Routes>
        <Route path="/" element={user ? <Chat /> : <LoginRegister />}></Route>
        <Route path="/login-register" element={user ? <Chat /> : <LoginRegister />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Container>
  )
}

export default App
