import { Outlet } from 'react-router-dom';
import { AdminContextProvider } from '../../contexts/AdminContext';

export default function PrivateRouter() {
  return (
      <>
        <AdminContextProvider>
          <Outlet />
        </AdminContextProvider>
      </>
  )
}