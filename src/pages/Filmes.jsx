import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useFavoritos } from '../context/FavoritosContext';
import SampleFilmes from '../data/filmes';

function Filmes() {
  const [quantidades, setQuantidades] = useState({});
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);
  const { ehFavorito, alternarFavorito } = useFavoritos();

  function alterarQuantidade(id, delta) {
    setQuantidades((quantidadesAtuais) => {
      const quantidadeAtual = quantidadesAtuais[id] || 0;
      const novaQuantidade = Math.max(0, quantidadeAtual + delta);
      return { ...quantidadesAtuais, [id]: novaQuantidade };
    });
    setPedidoFinalizado(false);
  }

  const valorTotal = useMemo(() => {
    return SampleFilmes.reduce((total, filme) => {
      const quantidade = quantidades[filme.id] || 0;
      return total + quantidade * filme.preco;
    }, 0);
  }, [quantidades]);

  const quantidadeTotalItens = useMemo(() => {
    return Object.values(quantidades).reduce((soma, q) => soma + q, 0);
  }, [quantidades]);

  function finalizarPedido() {
    setPedidoFinalizado(true);
  }

  return (
    <div className="catalogo-filmes">
      <p className="subtitulo">Monte o seu carrinho de aluguel de filmes</p>
      
      <ul className="lista-filmes-catalogo">
        {SampleFilmes.map((filme) => (
          <li key={filme.id} className="item-cardapio">
            <div className="info-filme-item">
              <div className="titulo-com-favorito">
                <Link to={`/filmes/${filme.id}`} className="link-detalhe">
                  <h3>{filme.nome}</h3>
                </Link>
                <button
                  type="button"
                  className={ehFavorito(filme.id) ? 'botao-favorito botao-favorito-ativo' : 'botao-favorito'}
                  onClick={() => alternarFavorito(filme.id)}
                >
                  {ehFavorito(filme.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <p>{filme.descricao}</p>
              <span className="categoria-badge" style={{ marginTop: '4px' }}>{filme.categoria}</span>
              <p className="preco" style={{ marginTop: '8px' }}>R$ {filme.preco.toFixed(2)}</p>
            </div>
            
            <div className="controle-quantidade">
  {/* Desabilita se já for 0 */}
  <button 
    onClick={() => alterarQuantidade(filme.id, -1)} 
    disabled={(quantidades[filme.id] || 0) === 0}
  >-</button>
  
  <span>{quantidades[filme.id] || 0}</span>
  
  {/* Desabilita se já for 1 */}
  <button 
    onClick={() => alterarQuantidade(filme.id, 1)} 
    disabled={(quantidades[filme.id] || 0) === 1}
  >+</button>
</div>
          </li>
        ))}
      </ul>

      <button
        className="botao-finalizar"
        onClick={finalizarPedido}
        disabled={quantidadeTotalItens === 0}
      >
        Confirmar Aluguel
      </button>

      {pedidoFinalizado && (
        <p className="resumo-pedido">
          🍿 Pedido fechado com {quantidadeTotalItens}{' '}
          {quantidadeTotalItens === 1 ? 'filme selecionado' : 'filmes selecionados'}. <br />
          Total da locação: <strong>R$ {valorTotal.toFixed(2)}</strong>
        </p>
      )}
    </div>
  );
}
/*tst*/
export default Filmes;