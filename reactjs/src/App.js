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
import CategoryList from './components/Category/CategoryList';
import CategoryAdd from './components/Category/CategoryAdd';
import CategoryUpdate from './components/Category/CategoryUpdate';
import Profile from './components/Profile';
import ProductList from './components/Product/ProductList';
import ProductAdd from './components/Product/ProductAdd';
import ProductUpdate from './components/Product/ProductUpdate';
import RatingList from './components/Rating/RatingList';
import RatingAdd from './components/Rating/RatingAdd';
import RatingUpdate from './components/Rating/RatingUpdate';
import CartList from './components/Cart/CartList';
import CartAdd from './components/Cart/CartAdd';
import CartUpdate from './components/Cart/CartUpdate';
import Charts from './components/Charts';
import PaymentCartList from './components/PaymentCart/PaymentCartList';
import PaymentCartAdd from './components/PaymentCart/PaymentCartAdd';
import PaymentCartUpdate from './components/PaymentCart/PaymentCartUpdate';
import PaymentCartRead from './components/PaymentCart/PaymentCartRead';
import UserRead from './components/user/UserRead';
import CategoryRead from './components/Category/CategoryRead';
import ProductRead from './components/Product/ProductRead';
import CartRead from './components/Cart/CartRead';
import RatingRead from './components/Rating/RatingRead';
import PostList from './components/Post/PostList';

function App  ()  {
  return (
    <Routes>
      <Route element={<Layout/>}>
      <Route element={<Main/>}>
        <Route element={<PrivateRoutes/>}>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/Charts' element={<Charts/>}/>
        <Route path='/user' element={<UserList/>}/>
        <Route path='/user/add' element={<UserAdd/>}/>
        <Route path='/user/edit/:id' element={<UserUpdate/>}/>
        <Route path='/user/:id' element={<UserRead/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/category' element={<CategoryList/>}/>
        <Route path='/category/add' element={<CategoryAdd/>}/>
        <Route path='/category/edit/:id' element={<CategoryUpdate/>}/>
        <Route path='/category/:id' element={<CategoryRead/>}/>

        <Route path='/product' element={<ProductList/>}/>
        <Route path='/product/add' element={<ProductAdd/>}/>
        <Route path='/product/edit/:id' element={<ProductUpdate/>}/>
        <Route path='/product/:id' element={<ProductRead/>}/>
  
        <Route path='/ratings' element={<RatingList/>}/>
        <Route path='/ratings/add' element={<RatingAdd/>}/>
        <Route path='/ratings/edit/:id' element={<RatingUpdate/>}/>
        <Route path='/ratings/:id' element={<RatingRead/>}/>

        <Route path='/cart' element={<CartList/>}/>
        <Route path='/cart/add' element={<CartAdd/>}/>
        <Route path='/cart/edit/:id' element={<CartUpdate/>}/>
        <Route path='/cart/:id' element={<CartRead/>}/>

        <Route path='/paymentcart' element={<PaymentCartList/>}/>
        <Route path='/paymentcart/add'element={<PaymentCartAdd/>}/>
        <Route path='/paymentcart/edit/:id' element={<PaymentCartUpdate/>}/>
        <Route path='/paymentcart/:id' element={<PaymentCartRead/>}/>

        <Route path='/post' element={<PostList/>}/>
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
