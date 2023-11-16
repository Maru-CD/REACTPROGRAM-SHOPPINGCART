import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './index.less'

import { CartProvider } from './context/CartProvider'
import { ProductsProvider } from './context/ProductsProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <body>
  <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductsProvider>
  </React.StrictMode>,
  </body>
)
