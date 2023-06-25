import axios from "axios";
import { useState } from "react";
import { Condutor } from "../../models/condutor.model";
import { Veiculo } from "../../models/veiculo.model";

export function AlugarVeiculo(){
    const [idade, setIdade] = useState(Number);
    const [dinheiro, setDinheiro] = useState(Number);
    const [precoAluguel, setPrecoAluguel] = useState(Number);
    
    function alugar(){

        let condutor: Condutor = new Condutor;
        let veiculo: Veiculo = new Veiculo;

        condutor.idade = idade;
        condutor.dinheiro = dinheiro;
        
        //trazendo o valor do aluguel do veiculo
        let valorAluguel = veiculo.precoAluguel;
        setPrecoAluguel(valorAluguel);
        veiculo.precoAluguel = precoAluguel;

        //condiçoes para alugar
        if (idade >= 18 && idade <= 26){
            let aux;
            aux = precoAluguel;
            aux *= 1.1;
            setPrecoAluguel(aux);
        }

        if (dinheiro < precoAluguel){
            alert("Saldo insuficiente para alugar o veiculo")
            console.log("Saldo insuficiente para alugar o veiculo")
        }else{
            alert("Veiculo alugado")
            console.log("Veiculo alugado")
        }
    }


        return(
            <div>             
                <h1> Cadastrar Veiculo </h1>
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
                type="text" value={precoAluguel} readOnly
                onChange={(event: any) => setPrecoAluguel(event.target.value)}
                />
            </div>

            <button onClick={alugar}>
                Alugar
            </button>
            </div>
        );
}
