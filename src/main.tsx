import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './app/store/store'
import { Toaster } from 'react-hot-toast'
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Analytics />
      <Toaster position='top-right' reverseOrder={false} />
    </Provider>
  </BrowserRouter>
)
