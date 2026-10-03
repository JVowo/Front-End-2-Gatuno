import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { autenticado, login, cadastrar } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const campoUsuarioRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 🕵️‍♂️ Descobre se o usuário clicou em "Login" ou em "Cadastrar" pela URL
  const ehModoCadastro = location.pathname === '/cadastro';

  useEffect(() => {
    if (autenticado) {
      navigate('/filmes');
    } else if (campoUsuarioRef.current) {
      campoUsuarioRef.current.focus();
    }
    // Limpa os avisos da tela quando o usuário muda de aba entre login e cadastro
    setMensagemErro('');
    setMensagemSucesso('');
    setUsuario('');
    setSenha('');
  }, [autenticado, navigate, location.pathname]);

  function lidarComFormulario(evento) {
    evento.preventDefault();
    setMensagemErro('');
    setMensagemSucesso('');

    if (!usuario.trim() || !senha.trim()) {
      setMensagemErro('Preencha todos os campos!');
      return;
    }

    if (ehModoCadastro) {
      // Executa a lógica de cadastro local
      const resultado = cadastrar(usuario, setSenha);
      if (resultado.sucesso) {
        setMensagemSucesso(resultado.mensagem + ' Redirecionando para o login...');
        setTimeout(() => {
          navigate('/login'); // Após cadastrar, joga ele pra tela de entrar
        }, 2000);
      } else {
        setMensagemErro(resultado.mensagem);
      }
    } else {
      // Executa a lógica de login local
      const sucesso = login(usuario, senha);
      if (sucesso) {
        navigate('/filmes');
      } else {
        setMensagemErro('Usuário ou senha inválidos.');
      }
    }
  }

  return (
    <div style={{ padding: '40px 20px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form className="formulario-login" onSubmit={lidarComFormulario} style={{ margin: 0 }}>
        <h2>{ehModoCadastro ? 'Criar Nova Conta' : 'Acessar Conta'}</h2>
        
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

        <button type="submit">
          {ehModoCadastro ? 'Cadastrar Minha Conta' : 'Entrar'}
        </button>

        {/* Avisos coloridos na tela */}
        {mensagemErro && <p style={{ color: '#ff4757', marginTop: '12px', fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold' }}>{mensagemErro}</p>}
        {mensagemSucesso && <p style={{ color: '#2ed573', marginTop: '12px', fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold' }}>{mensagemSucesso}</p>}
        
        {!ehModoCadastro && (
          <p style={{ fontSize: '0.8rem', color: '#858688', marginTop: '16px', marginBottom: 0, textAlign: 'center' }}>
            Dica: você também pode entrar com <strong>admin</strong> / <strong>filmes123</strong>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;