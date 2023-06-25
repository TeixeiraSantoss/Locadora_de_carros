import Nav from './componentes/paginas/Nav';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <Nav />

      <Outlet/>
    </div>
  );
}

export default App;
