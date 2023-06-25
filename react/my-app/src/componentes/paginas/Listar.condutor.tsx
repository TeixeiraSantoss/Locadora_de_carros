import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ListarCondutor(){
    const [condutores, setCondutores] = useState([]);

  function carregarDados() {
    axios
      .get("http://localhost:3001/condutor/listar")
      .then((resposta) => {
        setCondutores(resposta.data.dados);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  //Função de carregamento do componente
  //React Router DOM - https://www.youtube.com/watch?v=7b42lVMdEjE
  useEffect(() => {
    carregarDados();
  }, []);

  function remover(cpf: number) {
    axios
      .post("http://localhost:3001/condutor/excluir" + cpf)
      .then((resposta) => {
        carregarDados();
      })
      .catch((erro) => {
        // console.log(erro);
      });
  }

  return (
    <div>
      <h1> Listagem de Condutores </h1>
      <table border={1}>
        <thead>
          <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Saldo</th>
            <th>Alugando um Veiculo</th>
            <th>Alterar</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {condutores.map((condutor: any) => (
            <tr>
              <td>{condutor.cpf}</td>
              <td>{condutor.nome}</td>
              <td>{condutor.idade}</td>
              <td>{condutor.dinheiro}</td>
              <td>{condutor.alugando}</td>
              <td>
                <Link to={`/condutor/alterar/${condutor.cpf}`}> Detalhes </Link>
              </td>
              <td>
                <button onClick={() => remover(condutor.cpf)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}