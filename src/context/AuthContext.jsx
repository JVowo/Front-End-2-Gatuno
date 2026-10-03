import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const USUARIO_PADRAO = 'admin';
const SENHA_PADRAO = 'filmes123';
const CHAVE_AUTENTICACAO = 'gatuno.autenticado';
const CHAVE_BANCO_LOCAL = 'gatuno.usuarios';

export function AuthProvider({ children }) {
  const [autenticado, setAutenticado] = useState(() => {
    return localStorage.getItem(CHAVE_AUTENTICACAO) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(CHAVE_AUTENTICACAO, autenticado);
  }, [autenticado]);

  // 📝 FUNÇÃO DE CADASTRO: Salva um novo usuário no navegador
  function cadastrar(usuario, senha) {
    // Busca a lista de usuários que já existem ou cria uma lista vazia se for o primeiro
    const usuariosSalvos = JSON.parse(localStorage.getItem(CHAVE_BANCO_LOCAL)) || [];
    
    // Confere se esse nome de usuário já foi cadastrado por outra pessoa
    const usuarioJaExiste = usuario === USUARIO_PADRAO || usuariosSalvos.some(u => u.usuario === usuario);
    if (usuarioJaExiste) {
      return { sucesso: false, mensagem: 'Este usuário já está cadastrado!' };
    }

    // Adiciona o novo usuário na lista e salva de volta no navegador
    usuariosSalvos.push({ usuario, senha });
    localStorage.setItem(CHAVE_BANCO_LOCAL, JSON.stringify(usuariosSalvos));
    return { sucesso: true, mensagem: 'Conta criada com sucesso!' };
  }

  // 🔑 FUNÇÃO DE LOGIN: Confere as credenciais locais
  function login(usuario, senha) {
    // 1. Testa se é o admin padrão do sistema
    if (usuario === USUARIO_PADRAO && senha === SENHA_PADRAO) {
      setAutenticado(true);
      return true;
    }

    // 2. Se não for o admin, vai buscar na lista de cadastrados do navegador
    const usuariosSalvos = JSON.parse(localStorage.getItem(CHAVE_BANCO_LOCAL)) || [];
    const contaEncontrada = usuariosSalvos.find(u => u.usuario === usuario && u.senha === senha);

    if (contaEncontrada) {
      setAutenticado(true);
      return true;
    }

    return false; // Usuário ou senha errados
  }

  function logout() {
    setAutenticado(false);
  }

  return (
    <AuthContext.Provider value={{ autenticado, login, logout, cadastrar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (contexto === null) {
    throw new Error('useAuth precisa ser utilizado dentro de um AuthProvider');
  }
  return contexto;
}