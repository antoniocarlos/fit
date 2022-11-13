import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.scss'

import Router from './router'

const App: React.FC = () => (
  <BrowserRouter>
      <Router />
  </BrowserRouter>
)

export default App
