import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FavoritosProvider } from './context/FavoritosContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import FilmeLayout from './components/FilmeLayout'; // 🔥 Purificado!
import Home from './pages/Home';
import Filmes from './pages/Filmes';
import FilmeDetalhe from './pages/FilmeDetalhe';
import Favoritos from './pages/Favoritos';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import './App.css';

function RotasDaAplicacao() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Rotas Públicas */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />

        {/* Rotas Protegidas */}
        <Route path="filmes" element={<PrivateRoute />}>
          {/* Usando o layout purificado de cinema */}
          <Route element={<FilmeLayout />}>
            <Route index element={<Filmes />} />
            <Route path="favoritos" element={<Favoritos />} />
            <Route path=":filmeId" element={<FilmeDetalhe />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <FavoritosProvider>
        <RotasDaAplicacao />
      </FavoritosProvider>
    </AuthProvider>
  );
}

export default App;
