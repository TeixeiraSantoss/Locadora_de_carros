import axios from "axios";
import { useState } from "react";
import { Condutor } from "../../models/condutor.model";

export function AtualizarCondutor(){
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [dinheiro, setDinheiro] = useState("");
    const [alugando, setAlugando] = useState("");
    
    function atualizar(){
        let condutor: Condutor = new Condutor;
        condutor.nome = nome;
        condutor.idade = Number.parseInt(idade);
        condutor.dinheiro = Number.parseInt(dinheiro);
        condutor.alugando = Boolean(alugando);
        

        axios
            .post("http://localhost:3001/condutor/alterar", condutor)
            .then((resposta: any) => {
                //Executar algo quando a requisição for bem sucedida
                //Códigos HTTP na faixa do 200
                //Redirecionar para o componente da listagem
                console.log(resposta.data.mensagem);
                setNome("");
                setIdade("");
                setDinheiro("");
                setAlugando("");
            })
            .catch((erro: any) => {
                //Executar algo quando a requisição for mal sucedida
                //Códigos HTTP na faixa do 400 e 500
                console.log(erro);
            });
    }

    function teste(){
        console.log("Testes");
    }

    return(
        <div>
                    <h1> Atualizar Condutor </h1>
            <div>
                <label>Nome:</label>
                <input
                type="text"
                onChange={(event: any) => setNome(event.target.value)}
                />
            </div>

            <div>
                <label>Idade:</label>
                <input
                type="text"
                onChange={(event: any) => setIdade(event.target.value)}
                />
            </div>

            <div>
                <label>Saldo:</label>
                <input
                type="text"
                onChange={(event: any) => setDinheiro(event.target.value)}
                />
            </div>

            <div>
                <label>Alugando um veiculo:</label>
                <input
                type="text"
                onChange={(event: any) => setAlugando(event.target.value)}
                />
            </div>

            <div>
                <button onClick={atualizar}>
                Atualizar
                </button>
            </div>
        </div>
    )
}