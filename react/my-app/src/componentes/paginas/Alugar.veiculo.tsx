import axios from "axios";
import { useEffect, useState } from "react";
import { Condutor } from "../../models/condutor.model";
import { Veiculo } from "../../models/veiculo.model";
import { useParams } from "react-router-dom";

export function AlugarVeiculo(){
    const [veiculo, setVeiculo] = useState(null);
    const [idade, setIdade] = useState("");
    const [dinheiro, setDinheiro] = useState("");
    const [precoAluguel, setPrecoAluguel] = useState("");
    const { id } = useParams();

    useEffect(() => {
        axios
          .get(`http://localhost:3001/veiculo/buscar/${id}`)
          .then((resposta) => {
            const veiculo = resposta.data;
            setVeiculo(veiculo);
            setPrecoAluguel(veiculo.precoAluguel.toString());
          })
          .catch((erro) => {
            console.log(erro);
          });
      }, [id]);

    function alugar(){
        if (!veiculo) {
            return(
            <div>
                <h1>Nehum Veiculo carregou</h1>
            </div>);
          }
    

        //condiçoes para alugar
            

        if (dinheiro < precoAluguel || Number.parseInt(idade) < 18){
            if (dinheiro < precoAluguel){
                alert("Saldo insuficiente para alugar o veiculo")
            } else if (Number.parseInt(idade) < 18){
                alert("Condutor menor de idade");
            }
            
        }else{
            alert("Veiculo alugado")
            if (Number.parseFloat(idade) >= 18 && Number.parseInt(idade) <= 26){
                let aux;
                aux = Number.parseInt(precoAluguel);
                aux *= 1.1;
                setPrecoAluguel(aux.toString());
                alert("Taxa de 10% no valor do aluguel aplicada")
            }
        }

    }
    
    if (!veiculo) {
        return <div>Carregando...</div>;
      }

        return(
            <div>             
                <h1> Alugar Veiculo </h1>
            <div>
                <label>Idade do condutor:</label>
                <input
                type="text"
                onChange={(event: any) => setIdade(event.target.value)}
                />
            </div>

            <div>
                <label>Saldo do Condutor:</label>
                <input
                type="text"
                onChange={(event: any) => setDinheiro(event.target.value)}
                />
            </div>

            <div>
                <label>Preco do Aluguel:</label>
                <input
                type="text" value={precoAluguel}
                onChange={(event: any) => setPrecoAluguel(event.target.value)}
                />
            </div>

            <button onClick={alugar}>
                Alugar
            </button>
            </div>
        );
}