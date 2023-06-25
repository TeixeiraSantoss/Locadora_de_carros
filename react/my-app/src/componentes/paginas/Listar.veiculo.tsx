import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ListarVeiculo(){
    const [veiculos, setVeiculos] = useState([]);

  function carregarDados() {
    axios
      .get("http://localhost:3001/veiculo/listar")
      .then((resposta) => {
        setVeiculos(resposta.data.dados);
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

  function remover(id: number) {
    axios
      .post("http://localhost:3001/veiculo/excluir" + id)
      .then((resposta) => {
        carregarDados();
      })
      .catch((erro) => {
        // console.log(erro);
      });
  }

  return (
    <div>
      <h1> Listagem de Veiculos </h1>
      <table border={1}>
        <thead>
          <tr>
            <th>#</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Preço do Aluguel</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Integridade</th>
            <th>Combustivel</th>
            <th>Alugar</th>
            <th>Alterar</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((veiculo: any) => (
            <tr>
              <td>{veiculo.id}</td>
              <td>{veiculo.marca}</td>
              <td>{veiculo.modelo}</td>
              <td>{veiculo.precoAluguel}</td>
              <td>{veiculo.categoria}</td>
              <td>{veiculo.status}</td>
              <td>{veiculo.integridade}</td>
              <td>{veiculo.combustivel}</td>
              <td>
                <Link to={`/veiculo/alugar/${veiculo.id}`}> Alugar </Link>
              </td>
              <td>
                <Link to={`/veiculo/alterar/${veiculo.id}`}> Detalhes </Link>
              </td>
              <td>
                <button onClick={() => remover(veiculo.id)}> Excluir </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}