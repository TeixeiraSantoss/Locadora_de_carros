import axios from "axios";
import { useEffect, useState } from "react";

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

  return (
    <div>
      <h1>Listagem de produtos</h1>
      <table>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}