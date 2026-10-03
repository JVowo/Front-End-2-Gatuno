import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="pagina">
      <Navbar />
      <main className="conteudo">
        <Outlet /> {/* As páginas (Home, Catálogo) vão renderizar aqui dentro */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;