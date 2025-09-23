import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import AdminDashboard from './components/AdminDashboard'
import DeviceManagement from './components/DeviceManagement'
import UserManagement from './components/UserManagement'
import TheftManagement from './components/TheftManagement'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Sidebar /> */}
    {/* <AdminDashboard /> */}
    {/* <DeviceManagement /> */}
    {/* <UserManagement /> */}
    <TheftManagement />
    </>
  )
}

export default App
