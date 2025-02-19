import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import PlacePage from './pages/PlacePage'
import BookingPage from './pages/BookingPage'
import BookingsPage from './pages/BookingsPage'
import Header from './Header'
import Layout from './Layout'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './pages/ProfilePage'

axios.defaults.baseURL='http://localhost:4000'
axios.defaults.withCredentials = true;
function App() {
  const [count, setCount] = useState(0)
    


  
  return (
    
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<IndexPage/>}/>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path="/register" element={<RegisterPage/>} />
      <Route path='/account' element={<ProfilePage/>}/>
      <Route path='/account/profile' element={<ProfilePage/>}/>
      <Route path='/account/places' element={<PlacesPage/>} />
      <Route path='/account/bookings' element={<BookingsPage/>} />
      <Route path='/account/bookings/:id' element={<BookingPage/>} />
      <Route path='/account/places/new' element={<PlacesFormPage/>} />
      <Route path='/account/places/:id' element={<PlacesFormPage/>} />
      <Route path='/places/:id' element={<PlacePage/>}/>


    
      </Route>
    </Routes>
    </UserContextProvider>
    
    
  )
}

export default App
