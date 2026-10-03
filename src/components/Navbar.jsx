import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoSite from '../assets/gatuno.png'; 

function Navbar() {
  const { autenticado, logout } = useAuth();

  function estiloLink({ isActive }) {
    return isActive ? 'link-interno link-interno-ativo' : 'link-interno';
  }

  return (
    <nav className="navbar">
      <div className="navbar-marca-container">
        <img 
          src={logoSite} 
          alt="Logo Gatuno" 
          className="logo-navbar"
        />
        <span className="navbar-marca">GATUNO</span>
      </div>

      <div className="navbar-links">
        {/* O link Home (Início) sempre aparece para todo mundo */}
        <NavLink to="/" end className={estiloLink}>
          Início
        </NavLink>

        {/* 🔐 CONDIÇÃO: Se NÃO estiver logado, mostra Login e Cadastro colados no menu */}
        {!autenticado ? (
          <>
            <NavLink to="/login" className={estiloLink}>
              Login
            </NavLink>
            <NavLink to="/cadastro" className={estiloLink}>
              Cadastrar
            </NavLink>
          </>
        ) : (
          /* 🔓 Se ESTIVER logado, esconde os botões de login e mostra os de filmes */
          <>
            <NavLink to="/filmes" end className={estiloLink}>
              Filmes
            </NavLink>
            <NavLink to="/filmes/favoritos" className={estiloLink}>
              Meus Favoritos
            </NavLink>
            <button onClick={logout} className="botao-logout-navbar">
              Sair
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;