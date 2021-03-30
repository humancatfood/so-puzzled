import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import reportWebVitals from './reportWebVitals';

import { version } from '../package.json'

import App from './App'

console.log(`Version: ${version}`)
console.log(`Build: ${process.env.NODE_ENV}`)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log.bind(null, 'web vitals:'));
