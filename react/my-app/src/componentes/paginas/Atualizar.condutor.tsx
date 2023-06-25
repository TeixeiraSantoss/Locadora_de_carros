import axios from "axios";
import { useEffect, useState } from "react";
import { Condutor } from "../../models/condutor.model";
import { useParams } from "react-router-dom";

export function AtualizarCondutor(){
    const [Cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [dinheiro, setDinheiro] = useState("");
    const [alugando, setAlugando] = useState("");
    
    const { cpf } = useParams();

    useEffect(() => {
        // Buscar os dados do veículo com o ID fornecido
        axios
          .get(`http://localhost:3001/condutor/buscar/${cpf}`)
          .then((resposta) => {
            const condutor = resposta.data;
            setNome(condutor.nome);
            setIdade(condutor.idade.toString());
            setDinheiro(condutor.dinheiro.toString());
            setAlugando(condutor.alugando.toString());
          })
          .catch((erro) => {
            console.log(erro);
          });
      }, [cpf]);

    function atualizar(){
            let condutor = new Condutor();
            condutor.cpf = Number.parseInt(Cpf);
            condutor.nome = nome;
            condutor.idade = Number.parseInt(idade);
            condutor.dinheiro = Number.parseInt(dinheiro);
            condutor.alugando = Boolean(alugando);
            
            axios
            .post(`http://localhost:3001/condutor/alterar/${cpf}`, condutor)
            .then((resposta) => {
              console.log(resposta.data.mensagem);
              console.log("Alterado comsucesso");
            })
            .catch((erro) => {
              console.log(erro);
              console.log("Erro ao alterar");
        });
    }

    return(
        <div>
          <h1>Atualizar Condutor</h1>
    
          <div>
            <label>Nome:</label>
            <input
              type="text"
              onChange={(event) => setNome(event.target.value)}
            />
          </div>
    
          <div>
            <label>Idade:</label>
            <input
              type="text"
              onChange={(event) => setIdade(event.target.value)}
            />
          </div>
    
          <div>
            <label>Dinheiro:</label>
            <input
              type="text"
              onChange={(event) => setDinheiro(event.target.value)}
            />
          </div>
    
          <div>
            <label>Alugando:</label>
            <input
              type="text"
              onChange={(event) => setAlugando(event.target.value)}
            />
          </div>
    
          <div>
            <button onClick={atualizar}>Atualizar</button>
          </div>
        </div>
    )
}
