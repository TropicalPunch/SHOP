import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

const App = () => {
  return (
    <Router>
      <div>
        <Header style={{ position: 'relative' }} />
        <main className='py-4 '>
          <Container>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/products/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
