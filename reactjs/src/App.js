import './App.css';
import './css/styles.css'
import { Route, Routes } from 'react-router-dom';
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
import PostAdd from './components/Post/PostAdd';
import PostRead from './components/Post/PostRead';
import PostUpdate from './components/Post/PostUpdate';
import ResetPassword from './components/ResetPassword';
import UserDashboard from './UserComponents/UserDashboard';
import LoginUser from './UserComponents/LoginUser';
import RegisterUser from './UserComponents/RegisterUser';
import UserMain from './layout/UserMain';
import UserLayout from './layout/UserLayout';
import UserPrivateRoutes from './layout/UserPrivateRoutes';
import UserPublicRoutes from './layout/UserPublicRoutes';

function App() {
  return (
   
    <Routes>
      <Route  element={<Layout />}>
        <Route element={<Main />}>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/Charts' element={<Charts />} />

            <Route path='/user' element={<UserList />} />
            <Route path='/user/add' element={<UserAdd />} />
            <Route path='/user/edit/:id' element={<UserUpdate />} />
            <Route path='/user/:id' element={<UserRead />} />
            <Route path='/profile' element={<Profile />} />

            <Route path='/category' element={<CategoryList />} />
            <Route path='/category/add' element={<CategoryAdd />} />
            <Route path='/category/edit/:id' element={<CategoryUpdate />} />
            <Route path='/category/:id' element={<CategoryRead />} />

            <Route path='/product' element={<ProductList />} />
            <Route path='/product/add' element={<ProductAdd />} />
            <Route path='/product/edit/:id' element={<ProductUpdate />} />
            <Route path='/product/:id' element={<ProductRead />} />

            <Route path='/ratings' element={<RatingList />} />
            <Route path='/ratings/add' element={<RatingAdd />} />
            <Route path='/ratings/edit/:id' element={<RatingUpdate />} />
            <Route path='/ratings/:id' element={<RatingRead />} />

            <Route path='/cart' element={<CartList />} />
            <Route path='/cart/add' element={<CartAdd />} />
            <Route path='/cart/edit/:id' element={<CartUpdate />} />
            <Route path='/cart/:id' element={<CartRead />} />

            <Route path='/paymentcart' element={<PaymentCartList />} />
            <Route path='/paymentcart/add' element={<PaymentCartAdd />} />
            <Route path='/paymentcart/edit/:id' element={<PaymentCartUpdate />} />
            <Route path='/paymentcart/:id' element={<PaymentCartRead />} />

            <Route path='/post' element={<PostList />} />
            <Route path='/post/add' element={<PostAdd />} />
            <Route path='/post/:id' element={<PostRead />} />
            <Route path='/post/edit/:id' element={<PostUpdate />} />
          </Route>
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path='/admin/login' element={<Login />} />
          <Route path='/admin/register' element={<Register />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
        </Route>
      </Route>
      <Route path='*' element={<PageNotFound />} />
    
      <Route path='/' element={<UserLayout />}>
        
        <Route element={<UserMain />}>
          <Route element={<UserPrivateRoutes />}>
            <Route path='/' element={<UserDashboard />} />
            <Route path='user/profile' element={<Profile/>} />
            <Route path='user/category' element={<CategoryList />} />
            <Route path='user/category/add' element={<CategoryAdd />} />
            <Route path='user/category/edit/:id' element={<CategoryUpdate />} />
            <Route path='user/category/:id' element={<CategoryRead />} />

            <Route path='user/product' element={<ProductList />} />
            <Route path='user/product/add' element={<ProductAdd />} />
            <Route path='user/product/edit/:id' element={<ProductUpdate />} />
            <Route path='user/product/:id' element={<ProductRead />} />

            <Route path='user/ratings' element={<RatingList />} />
            <Route path='user/ratings/add' element={<RatingAdd />} />
            <Route path='user/ratings/edit/:id' element={<RatingUpdate />} />
            <Route path='user/ratings/:id' element={<RatingRead />} />

            <Route path='user/cart' element={<CartList />} />
            <Route path='user/cart/add' element={<CartAdd />} />
            <Route path='user/cart/edit/:id' element={<CartUpdate />} />
            <Route path='user/cart/:id' element={<CartRead />} />

            <Route path='user/paymentcart' element={<PaymentCartList />} />
            <Route path='user/paymentcart/add' element={<PaymentCartAdd />} />
            <Route path='user/paymentcart/edit/:id' element={<PaymentCartUpdate />} />
            <Route path='user/paymentcart/:id' element={<PaymentCartRead />} />

            <Route path='user/post' element={<PostList />} />
            <Route path='user/post/add' element={<PostAdd />} />
            <Route path='user/post/:id' element={<PostRead />} />
            <Route path='user/post/edit/:id' element={<PostUpdate />} />
            
          </Route>
          
        </Route>
        <Route element={<UserPublicRoutes />}>
          <Route path='/user/login' element={<LoginUser />} />
          <Route path='/user/register' element={<RegisterUser />} />
          <Route path='/user/resetpassword' element={<ResetPassword />} />
        </Route>

      </Route>
    </Routes>
   

   

  );
}

export default App;
