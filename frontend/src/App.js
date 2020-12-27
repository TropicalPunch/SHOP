import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import AdminsAllUsersScreen from './screens/AdminsAllUsersScreen'
import UserEditByAdminScreen from './screens/UserEditByAdminScreen'
import AdminsProductListScreen from './screens/AdminsProductListScreen'
import AdminsProductEditScreen from './screens/AdminsProductEditScreen'
import AdminsAllOrdersScreen from './screens/AdminsAllOrdersScreen'
const App = () => {
  return (
    <Router>
      <div>
        <Header style={{ position: 'relative' }} />
        <main className='py-4 '>
          <Container>
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/products/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/admin/users' component={AdminsAllUsersScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditByAdminScreen} /> 
            <Route path='/admin/products' component={AdminsProductListScreen} />
            <Route path='/admin/product/:id/edit' component={AdminsProductEditScreen} />
            <Route path='/admin/orders' component={AdminsAllOrdersScreen} />
            <Route path='/' component={HomeScreen} exact />

          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
