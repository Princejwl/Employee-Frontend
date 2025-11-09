
import './App.css';
import Header from './pages/header/Header';
import { Route,Routes } from 'react-router-dom';
import Nomatch from './pages/nomatch/Nomatch';
import Dashboard from './pages/dashboard/Dashboard';
import PostUser from './pages/employee/PostUser';
import UpdateUser from './pages/employee/UpdateUser';
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

function App() {
  return (
 <>

 <Header/>
 <Routes>
    <Route path="/login" element={<Login/>} />
  <Route path="/signup" element={<Signup/>} /> 
 <Route element={<PrivateRoute />}></Route>

  <Route path='/'  element={<Dashboard/>} />
  <Route path='/employee'  element={<PostUser/>} />
   <Route path='/employee/:id'  element={<UpdateUser/>} />
  <Route path='*'  element={<Nomatch/>} />
 </Routes>
 </>
  );
}

export default App;
