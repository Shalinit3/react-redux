import React from 'react'
import { render } from 'react-dom/index'

import Route from './routes/Route'

import './semantic/dist/semantic.min.css'

render(
  <Route />,
  document.getElementById('root'))
