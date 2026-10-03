import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute() {
  const { autenticado } = useAuth();

  // Se estiver autenticado, libera o acesso (Outlet). Se não, joga para a Home (/)
  return autenticado ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoute;
