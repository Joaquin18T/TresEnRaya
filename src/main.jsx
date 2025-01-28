import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux'
import Store from './Store/Store.js'
import {BrowserRouter} from 'react-router-dom'

//Component Provider: Para que todos los componentes puedan usar los datos del redux
//prop del Provider (store): el store del redux a utilizar  
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <BrowserRouter basename='/TresEnRaya'>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
