import imgInterestelar from '../assets/interestelar.jpg';
import bannerInterestelar from '../assets/BannerInterestelar.jpg';
import imgLeao from '../assets/leao.jpg';
import bannerLeao from '../assets/BannerLeao.jpg';
import imgBatman from '../assets/batman.png';
import bannerBatman from '../assets/BannerBatman.jpg';
import imgAranha from '../assets/aranha.jpg';
import bannerAranha from '../assets/BannerAranha.jpg';

const filmes = [
  {
    id: 1,
    nome: 'Batman: O Cavaleiro das Trevas',
    descricao:
      'Quando a ameaça conhecida como Coringa causa estragos e caos no povo de Gotham, Batman deve aceitar um dos maiores testes psicológicos.',
    categoria: 'Ação',
    preco: 9.9,
    imagem: imgBatman,
    banner: bannerBatman,
  },
  {
    id: 2,
    nome: 'Interestelar',
    descricao:
      'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.',
    categoria: 'Ficção Científica',
    preco: 12.9,
    imagem: imgInterestelar,
    banner: bannerInterestelar,
  },
  {
    id: 3,
    nome: 'O Rei Leão',
    descricao:
      'Após a morte de seu pai, um jovem leão foge de seu reino apenas para aprender o verdadeiro significado de responsabilidade e bravura.',
    categoria: 'Live Action',
    preco: 7.9,
    imagem: imgLeao,
    banner: bannerLeao,
  },
  {
    id: 4,
    nome: 'Homem-Aranha: Através do Aranhaverso',
    descricao:
      'Nesse novo filme acompanhamos novamente Miles Morales enquanto ele viaja pelo multiverso e entra em conflito com outros heróis aracnídeos enquanto tenta impedir uma ameaça ainda maior, uma que pode por em risco todo o multiverso!',
    categoria: 'Animação',
    preco: 10.9,
    imagem: imgAranha,
    banner: bannerAranha,
  },
];

export default filmes;