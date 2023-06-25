import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/veiculo/cadastrar">Cadastrar Veiculo</Link>
        </li>
        <li>
          <Link to="/veiculo/listar">Listar Veiculo</Link>
        </li>
        <li>
          <Link to="/condutor/cadastrar">Cadastrar Condutor</Link>
        </li>
        <li>
          <Link to="/condutor/listar">Listar Condutor</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
