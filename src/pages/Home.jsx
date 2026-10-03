import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import filmes from '../data/filmes';

function Home() {
  const { autenticado } = useAuth();

  // 🎰 Estados para controlar o Carrossel Automático
  const [slideAtual, setSlideAtual] = useState(0);

  // Efeito para o carrossel passar sozinho a cada 4 segundos
  useEffect(() => {
    const temporizador = setInterval(() => {
      setSlideAtual((slideAnterior) =>
        slideAnterior === filmes.length - 1 ? 0 : slideAnterior + 1
      );
    }, 4000); // 4000 milissegundos = 4 segundos

    return () => clearInterval(temporizador); // Limpa o timer ao sair da tela
  }, []);

  // Funções para passar ou voltar o slide manualmente nas setas
  function proximoSlide() {
    setSlideAtual(slideAtual === filmes.length - 1 ? 0 : slideAtual + 1);
  }

  function slideAnterior() {
    setSlideAtual(slideAtual === 0 ? filmes.length - 1 : slideAtual - 1);
  }

  return (
    <div className="home">
      {/* 🎬 CARROSSEL AUTOMÁTICO ESTILO RENT-A-MOVIE */}
      <div className="carrossel-container">
        {filmes.map((filme, index) => (
          <div
            key={filme.id}
            className={
              index === slideAtual ? 'carrossel-slide ativo' : 'carrossel-slide'
            }
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(11,12,16,0.95)), url(${filme.banner})`,
            }}
          >
            <div className="carrossel-conteudo">
              <span className="carrossel-badge-relevancia">
                Destaque da Semana
              </span>
              <h2>{filme.nome}</h2>
              <p>{filme.descricao}</p>
            </div>
          </div>
        ))}

        {/* Setas de Navegação Laterais */}
        <button className="carrossel-seta esquerda" onClick={slideAnterior}>
          &lt;
        </button>
        <button className="carrossel-seta direita" onClick={proximoSlide}>
          &gt;
        </button>

        {/* Barrinhas Vermelhas de Paginação do seu design original */}
        <div className="carrossel-indicadores">
          {filmes.map((_, index) => (
            <div
              key={index}
              className={index === slideAtual ? 'indicador ativo' : 'indicador'}
              onClick={() => setSlideAtual(index)}
            />
          ))}
        </div>
      </div>

      <h2
        style={{
          color: '#fff',
          textAlign: 'left',
          fontSize: '1.8rem',
          borderLeft: '4px solid #fffb00',
          paddingLeft: '12px',
          marginTop: '40px',
        }}
      >
        🔥 Filmes em Destaque
      </h2>

      {/* Galeria de Filmes em Cards */}
      <div className="galeria">
        {filmes.map((filme) => (
          <div key={filme.id} className="item-galeria-filme">
            <img src={filme.imagem} alt={filme.nome} className="capa-filme" />
            <div className="info-filme-home">
              <span className="categoria-badge">{filme.categoria}</span>
              <h3>{filme.nome}</h3>
              <p className="preco-filme">
                Locação: R$ {filme.preco.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;