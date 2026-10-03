import { createContext, useContext, useEffect, useState } from 'react';

const FavoritosContext = createContext(null);
const CHAVE_ARMAZENAMENTO = 'cineflix.favoritos';

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    const dadosSalvos = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  useEffect(() => {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(favoritos));
  }, [favoritos]);

  function alternarFavorito(filmeId) {
    setFavoritos((favoritosAtuais) => {
      const jaEhFavorito = favoritosAtuais.includes(filmeId);
      if (jaEhFavorito) {
        return favoritosAtuais.filter((id) => id !== filmeId);
      }
      return [...favoritosAtuais, filmeId];
    });
  }

  function ehFavorito(filmeId) {
    return favoritos.includes(filmeId);
  }

  return (
    <FavoritosContext.Provider
      value={{ favoritos, alternarFavorito, ehFavorito }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const contexto = useContext(FavoritosContext);
  if (contexto === null) {
    throw new Error(
      'useFavoritos precisa ser utilizado dentro de um FavoritosProvider'
    );
  }
  return contexto;
}