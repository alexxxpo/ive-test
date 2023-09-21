import { Outlet } from 'react-router-dom'
import Header from '../../components/header'

export const Layout = () => {
    
  return (
    <>
        <Header/>
        <h1>Test task</h1>
        <Outlet/>
    </>
  )
}