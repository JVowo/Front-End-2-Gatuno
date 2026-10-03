import { useParams, Link } from 'react-router-dom';
import { useFavoritos } from '../context/FavoritosContext';
import filmes from '../data/filmes';

function FilmeDetalhe() {
  // 🍿 CAPTURA DO ID DO FILME PURIFICADA
  const { filmeId } = useParams();
  
  // Busca o filme na nossa lista usando o ID da rota
  const filme = filmes.find((item) => item.id === Number(filmeId));
  const { ehFavorito, alternarFavorito } = useFavoritos();

  if (!filme) {
    return (
      <div className="filme-detalhe-container" style={{ padding: '40px', textAlign: 'center' }}>
        <p>Não encontramos nenhum filme com este identificador.</p>
        <Link to="/filmes" style={{ color: '#fffb00', fontWeight: 'bold' }}>Voltar para o catálogo</Link>
      </div>
    );
  }

  return (
    <div className="filme-detalhe-container">
      <img src={filme.imagem} alt={`Pôster do filme ${filme.nome}`} />

      <div className="titulo-com-favorito titulo-detalhe" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
        <h2>{filme.nome}</h2>
        <button
          type="button"
          className={
            ehFavorito(filme.id)
              ? 'botao-favorito botao-favorito-ativo'
              : 'botao-favorito'
          }
          onClick={() => alternarFavorito(filme.id)}
          aria-label={
            ehFavorito(filme.id)
              ? 'Remover dos favoritos'
              : 'Marcar como favorito'
          }
        >
          {ehFavorito(filme.id) ? '❤️' : '🤍'}
        </button>
      </div>

      <span className="categoria-badge" style={{ margin: '12px 0', display: 'inline-block' }}>
        {filme.categoria}
      </span>
      <p className="descricao-detalhe">{filme.descricao}</p>
      <p className="preco-detalhe">Aluguel: R$ {filme.preco.toFixed(2)}</p>

      <Link to="/filmes" className="link-voltar">
        Voltar para o catálogo
      </Link>
    </div>
  );
}

export default FilmeDetalhe;