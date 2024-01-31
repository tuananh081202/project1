import './App.css';
import './css/styles.css'
import { Route,Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Main from './layouts/Main';
import Login from './components/Login';
import PublicRoutes from './layouts/PublicRoutes';
import PrivateRoutes from './layouts/PrivateRoutes';
import PageNotFound from './components/PageNotFound';
import Layout from './layouts/Layout';
import "react-toastify/dist/ReactToastify.css"
import UserList from './components/user/UserList';
import UserAdd from './components/user/UserAdd';
import UserUpdate from './components/user/UserUpdate';
import Profile from './components/Profile';
function App  ()  {
  return (
    <Routes>
      <Route element={<Layout/>}>
      <Route element={<Main/>}>
        <Route element={<PrivateRoutes/>}>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/user' element={<UserList/>}/>
        <Route path='user/add' element={<UserAdd/>}/>
        <Route path='user/edit/:id' element={<UserUpdate/>}/>
        <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Route>
      <Route element={<PublicRoutes/>}>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      </Route>
      </Route>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    
        



  );
}

export default App;
