import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Função principal
export function ListarVeiculo(){
    //Gettrer e Setter
      //Array que vai receber um veiculo
    const [veiculos, setVeiculos] = useState([]);

  //Função para carregar os dados da minha API
  function carregarDados() {
    //"axios" para fazer uma requisição para a API
    axios
      //Metodo HTTP "get", e a rota para a qual a minha requisição será enviada
      .get("http://localhost:3001/veiculo/listar")

      //Trecho de codigo que será execultado caso a requisição seja recebida, e retorne sem problemas
        //"resposta" esta recebendo todos os dados recebidos pela a requisição
      .then((resposta) => {
        //Atribuindo os valores de "resposta.data.dados" para o Array "veiculos"
        setVeiculos(resposta.data.dados);
      })

      //Trecho que será execultado caso a requisição seja mau sucedida
      .catch((erro) => {
        console.log(erro);
      });
  }

  //"useEffect" vai execultar algo sempre que o componente for carregado
  useEffect(() => {
    //Execultando a Função "carregandoDados" 
    carregarDados();

    //Passando um Array vazio como parametro do "useEffect"
      //Neste caso o "useEffect" será execultado apenas 1 vez
  }, []);

  //Função "remover"
    //Recebe "id" como parametro
  function remover(id: number) {
    //Usando "axios" para enviar uma requisição para a API
    axios
      //Metodo HTTP "delete", rota para a qual a requisição vai ser enviada
        //Passando "id" na URL. Neste caso, é muito provavel que a minha rota definida na API, recebe "id" como atributo na URL. Basicamente serve para definir uma rota unica para cada "Veiculo"
      .delete("http://localhost:3001/veiculo/excluir/" + id)
      .then((resposta) => {
        //Chama o "carregandoDados" para "atualizar" a lista de veiculos sempre que a função "remover" é chamada
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
          {/* Chama o Array "veiculos" onde está armazenado todos os veiculos do programa */}
            {/* ".map" esta transformando os veiculos armazenados em "veiculos" em uma tabela HTML */}
              {/* Isso é feito para poder apresentar os dados dos veiculos de forma simples */}
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
