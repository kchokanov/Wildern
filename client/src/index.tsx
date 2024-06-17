import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import App from './components/App'

const root = document.getElementById('root')

if (root != null) {
  let app = (
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  )

  if (process.env.NODE_ENV === 'development') {
    console.info('Web app is running in dev mode.')
    app = <React.StrictMode>{app}</React.StrictMode>
  }

  ReactDOM.createRoot(root).render(
    app
  )
}
