import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

const App = () => {
  return (
    <div>
      <Header />
      <main className='py-4'>
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default App
