import { Link } from 'react-router-dom';
import { useFavoritos } from '../context/FavoritosContext';
import filmes from '../data/filmes';

function Favoritos() {
  const { favoritos } = useFavoritos();

  // Filtra a lista de filmes exibindo apenas os que o usuário favoritou
  const filmesFavoritos = filmes.filter((filme) =>
    favoritos.includes(filme.id)
  );

  if (filmesFavoritos.length === 0) {
    return (
      <div
        className="favoritos-vazio"
        style={{ padding: '40px 24px', textAlign: 'center' }}
      >
        <p style={{ color: '#c5c6c7', fontSize: '1.1rem' }}>
          Você ainda não marcou nenhum filme com o coração de favorito.
        </p>
        <Link to="/filmes" style={{ color: '#fffb00', fontWeight: 'bold', textDecoration: 'none' }}>
          🍿 Explorar o catálogo de filmes
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '640px', margin: '40px auto', padding: '0 24px' }}>
      <ul className="lista-filmes-favoritos" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filmesFavoritos.map((filme) => (
          <li
            key={filme.id}
            className="item-cardapio"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px',
              backgroundColor: '#1f2833',
              borderRadius: '10px',
              marginBottom: '16px',
              border: '1px solid rgba(255, 255, 255, 0.02)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <Link
                to={`/filmes/${filme.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h3 style={{ margin: '0 0 6px 0', color: '#fff', fontSize: '1.2rem' }}>
                  {filme.nome}
                </h3>
              </Link>
              <span className="categoria-badge" style={{ margin: 0 }}>
                {filme.categoria}
              </span>
            </div>
            <span
              className="preco-favorito"
              style={{ fontWeight: 'bold', color: '#fffb00', fontSize: '1.1rem' }}
            >
              R$ {filme.preco.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favoritos;