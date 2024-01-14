import './App.css';
import { useState } from 'react';
import Footer from './components/Footer'
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import {Routes, Route} from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import CategoryScreen from './screens/CategoryScreen';
import SearchedProductPage from './screens/SearchedProductPage';
import { useLocation } from 'react-router-dom';
import WomenFashion from './categories/WomenFashion';
import MenFashion from './categories/MenFashion';
import WristWatch from './categories/WristWatch';
import TopBar from './components/TopBar';
import ErrorBoundary from './ErrorBoundary';
import WeatherRecommended from './screens/WheatherRecommended';
import MenFootwear from './categories/MenFootwear';

document.cookie = "myCookie=myValue; samesite=strict; secure";
function App() {

  const route = `/product_/:name/:id`
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [recommendedLink, setRecommendedLink] = useState('')
  const location = useLocation()
    
    return (
      <ErrorBoundary>
        <div>
          {location.pathname !== '/login' && location.pathname !== '/register' &&(
            <>
              <TopBar  setRecommendedLink={setRecommendedLink} recommendedLink={recommendedLink}/>
              <Header keyword={keyword} setKeyword={setKeyword} />
            </>
          )}
          <main className='container-fluid mt-3'>
            <Routes>
              <Route path='/login' element= {<LoginScreen />}/>
              <Route path='/' element= {<HomeScreen keyword={keyword} category={category} setCategory={setCategory}/>} exact/>
              <Route path={`/${recommendedLink}/weather_recommended-products`} element={<WeatherRecommended 
              recommendedLink={recommendedLink}/>} />
              <Route path='/register' element= {<RegisterScreen />}/>
              <Route path='/profile' element= {<ProfileScreen />}/>
              <Route path='/shipping' element= {<ShippingScreen />}/>
              <Route path='/placeorder' element= {<PlaceOrderScreen />}/>
              <Route path='/order/:id' element= {<OrderScreen />}/>
              <Route path='/payment' element= {<PaymentScreen />}/>
              <Route path={route} element={<ProductScreen />} />
              <Route path='/cart/:id?' element={<CartScreen />} />
              <Route path='/admin/userlist' element= {<UserListScreen />}/>
              <Route path='/admin/user/:id/edit' element= {<UserEditScreen />}/>

              <Route path='/admin/productlist' element= {<ProductListScreen />}/>
              <Route path='/admin/product/:id/edit' element= {<ProductEditScreen />}/>

              <Route path='/admin/orderlist' element= {<OrderListScreen />}/>
              <Route path='/product/category' element= {<CategoryScreen category={category} setCategory={setCategory}/> } />
              <Route path='/search' element = {<SearchedProductPage keyword={keyword}/>} />
              <Route path='/category/womenfashion' element = {<WomenFashion />} />
              <Route path='/category/menfashion' element = {<MenFashion />} />
              <Route path='/category/menfootwear' element = {<MenFootwear />} />
              <Route path='/category/watches' element = {<WristWatch />} />
              
            </Routes>
          </main>
          <Footer /> 
        </div>
      </ErrorBoundary>
  );
}

export default App;
