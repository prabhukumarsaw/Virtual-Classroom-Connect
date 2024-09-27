
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import { AuthProvider } from './context/AuthContext'
import { RoomProvider } from './context/roomContext'




ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
   <RoomProvider>
  <RouterProvider router={router} />
  </RoomProvider>
  </AuthProvider>
  
)
