import './styles/App.css'
import Sidebar from './components/SideBar'
import Views from './components/Views'

import { useLocation } from 'react-router-dom';
import useSessionTimeout from './hooks/useSessionTimeout';

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === '/';
  useSessionTimeout();
  return (
    <div className='flex'>
      {!isLoginPage ? (
      <>
        <div className='SideBar-noPrint'>
          <Sidebar/>
        </div>
        <div className='main-content-with-sidebar'>
          <Views/>
        </div>
      </>
      ): (
      <div className='w-screen'>
        <Views/>
      </div>
      )}
    </div>
  )
}

export default App
