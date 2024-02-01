import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import GlobalStyle from './styles/global'
import Routes from './routes'

function App(): React.JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>

      <GlobalStyle />
    </>
  )
}

export default App
