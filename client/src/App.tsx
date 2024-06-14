
import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignInPage from './components/SignIn'
import SignUp from './components/SignUp'
import Homepage from './components/Homepage'
import Layout from './Layout'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <>
      <Routes>
        <Route path='' element={<Layout />}>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/signIn' element={<SignInPage />}></Route>
          <Route path='/signUp' element={<SignUp />}></Route>
        </Route>
      </Routes >
    </>
  )
}

export default App
