import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import './bootstrap.min.css'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  //store is being passed by the provider accross all the app: it contains the reducers(actions) and state 
  <Provider store={store}>  
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
