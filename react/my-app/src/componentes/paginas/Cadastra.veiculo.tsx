import axios from "axios";
import { useState } from "react";
import { Veiculo } from "../../models/veiculo.model";

export function CadastrarVeiculo(){
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [precoAluguel, setPrecoAluguel] = useState("");
    const [categoria, setCategoria] = useState("");
    const [status, setStatus] = useState("");
    const [integridade, setIntegridade] = useState("");
    const [combustivel, setCombustivel] = useState("");

    function enviar(){
        let veiculo: Veiculo = new Veiculo;
        veiculo.marca = marca;
        veiculo.modelo = modelo;
        veiculo.precoAluguel = Number.parseInt(precoAluguel);
        veiculo.categoria = categoria;
        veiculo.status = Boolean(status); //Retorna "true" caso a String não esteja vazia
        veiculo.integridade = Boolean(integridade);
        veiculo.combustivel = Number.parseInt(combustivel);

        axios
            .post("http://localhost:3001/veiculo/cadastrar", veiculo)
            .then((resposta: any) => {
                //Executar algo quando a requisição for bem sucedida
                //Códigos HTTP na faixa do 200
                //Redirecionar para o componente da listagem
                console.log(resposta.data.mensagem);
                setMarca("");
                setModelo("");
                setPrecoAluguel("");
                setCategoria("");
                setStatus("");
                setIntegridade("");
                setCombustivel("");
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
                    <h1> Cadastrar Produto</h1>
            <div>
                <label>Marca:</label>
                <input
                type="text"
                onChange={(event: any) => setMarca(event.target.value)}
                />
            </div>

            <div>
                <label>Modelo:</label>
                <input
                type="text"
                onChange={(event: any) => setModelo(event.target.value)}
                />
            </div>

            <div>
                <label>Preco do Aluguel:</label>
                <input
                type="text"
                onChange={(event: any) => setPrecoAluguel(event.target.value)}
                />
            </div>

            <div>
                <label>Categoria:</label>
                <input
                type="text"
                onChange={(event: any) => setCategoria(event.target.value)}
                />
            </div>

            <div>
                <label>Status:</label>
                <input
                type="text"
                onChange={(event: any) => setStatus(event.target.value)}
                />
            </div>

            <div>
                <label>Integridade:</label>
                <input
                type="text"
                onChange={(event: any) => setIntegridade(event.target.value)}
                />
            </div>

            <div>
                <label>Combustivel:</label>
                <input
                type="text"
                onChange={(event: any) => setCombustivel(event.target.value)}
                />
            </div>

            <div>
                <button onClick={enviar}>
                Cadastrar
                </button>
            </div>
        </div>
    )
}