import axios from "axios";
import { useEffect, useState } from "react";
import { Veiculo } from "../../models/veiculo.model";
import { useParams } from "react-router-dom";

export function AtualizarVeiculo(){
    const [Id, setId] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [precoAluguel, setPrecoAluguel] = useState("");
    const [categoria, setCategoria] = useState("");
    const [status, setStatus] = useState("");
    const [integridade, setIntegridade] = useState("");
    const [combustivel, setCombustivel] = useState("");

    const { id } = useParams();

    useEffect(() => {
        // Buscar os dados do veículo com o ID fornecido
        axios
          .get(`http://localhost:3001/veiculo/buscar/${id}`)
          .then((resposta) => {
            const veiculo = resposta.data;
            setMarca(veiculo.marca);
            setModelo(veiculo.modelo);
            setPrecoAluguel(veiculo.precoAluguel.toString());
            setCategoria(veiculo.categoria);
            setStatus(veiculo.status.toString());
            setIntegridade(veiculo.integridade.toString());
            setCombustivel(veiculo.combustivel.toString());
          })
          .catch((erro) => {
            console.log(erro);
          });
      }, [id]);

    function atualizar(){
            let veiculo = new Veiculo();
            veiculo.id = Number.parseInt(Id);
            veiculo.marca = marca;
            veiculo.modelo = modelo;
            veiculo.precoAluguel = Number.parseInt(precoAluguel);
            veiculo.categoria = categoria;
            veiculo.status = Boolean(status);
            veiculo.integridade = Boolean(integridade);
            veiculo.combustivel = Number.parseInt(combustivel);
            
            axios
            .post(`http://localhost:3001/veiculo/alterar/${id}`, veiculo)
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
                    <h1> Atualizar Veiculo </h1>
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
                <button onClick={atualizar}>
                Atualizar
                </button>
            </div>
        </div>
    )
}
