import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Cadastro() {
  const { autenticado, cadastrar } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const campoUsuarioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (autenticado) {
      navigate('/filmes');
    } else if (campoUsuarioRef.current) {
      campoUsuarioRef.current.focus();
    }
  }, [autenticado, navigate]);

  function lidarComCadastro(evento) {
    evento.preventDefault();
    setMensagemErro('');
    setMensagemSucesso('');

    if (!usuario.trim() || !senha.trim()) {
      setMensagemErro('Preencha todos os campos!');
      return;
    }

    // Executa a lógica de salvar no banco local do navegador
    const resultado = cadastrar(usuario, senha);
    
    if (resultado.sucesso) {
      setMensagemSucesso(resultado.mensagem + ' Redirecionando para o login...');
      setTimeout(() => {
        navigate('/login'); // Joga ele para a tela de login após 2 segundos
      }, 2000);
    } else {
      setMensagemErro(resultado.mensagem);
    }
  }

  return (
    <div style={{ padding: '40px 20px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form className="formulario-login" onSubmit={lidarComCadastro} style={{ margin: 0 }}>
        <h2>Criar Nova Conta</h2>
        
        <label htmlFor="usuario">Nome de Usuário</label>
        <input
          id="usuario"
          type="text"
          ref={campoUsuarioRef}
          value={usuario}
          onChange={(evento) => setUsuario(evento.target.value)}
          placeholder="Ex: gatunofilmes"
        />

        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={(evento) => setSenha(evento.target.value)}
          placeholder="********"
        />

        <button type="submit">Cadastrar Minha Conta</button>

        {mensagemErro && <p style={{ color: '#ff4757', marginTop: '12px', fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold' }}>{mensagemErro}</p>}
        {mensagemSucesso && <p style={{ color: '#2ed573', marginTop: '12px', fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold' }}>{mensagemSucesso}</p>}
      </form>
    </div>
  );
}

export default Cadastro;