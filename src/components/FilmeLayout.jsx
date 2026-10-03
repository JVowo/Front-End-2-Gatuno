import { Outlet, Link } from 'react-router-dom';

function FilmeLayout() {
  return (
    <div className="filme-layout">
      <div className="filme-cabecalho">
        <h1>🎬 Catálogo de Filmes</h1>
        <Link to="/filmes" className="link-topo">
          Ver todos os filmes
        </Link>
      </div>
      <Outlet /> {/* Aqui dentro vai carregar a lista de filmes ou os favoritos */}
    </div>
  );
}
/*teste*/ 
export default FilmeLayout;