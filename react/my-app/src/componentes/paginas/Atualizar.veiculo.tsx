import axios from "axios";
import { useEffect, useState } from "react";
import { Veiculo } from "../../models/veiculo.model";
import { useParams } from "react-router-dom";

export function AtualizarVeiculo(){
    //cria 1 Getter e Settrer para cada atributo do veiculo
        //Todos os Getters e Setters são do tipo "string"
    const [Id, setId] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [precoAluguel, setPrecoAluguel] = useState("");
    const [categoria, setCategoria] = useState("");
    const [status, setStatus] = useState("");
    const [integridade, setIntegridade] = useState("");
    const [combustivel, setCombustivel] = useState("");

    //useParams pega um valor da URL
        //Neste caso o "id" que está presente na URL da pagina
            //A URL é definida na chamada do componente, no caso deste programa, está no arquivo "index.tsx", voce vai encontrar a chamada da Função "AtualizarVeiculo"
    const { id } = useParams();

    //Trecho de codigo que vai receber os dados da API e atribuir aos "Getters" do Componente 
    useEffect(() => {
        //Envia uma requisição para a API
        axios
          //Enivia a requisição "GET" para determinada URL(que é definida no "router" la na API)
          .get(`http://localhost:3001/veiculo/buscar/${id}`)
          //".then" trecho de codigo que vai ser execultado caso a requisição seja bem sucedida
          .then((resposta) => {
            //Cria uma constante que está recebendo "resposta.data"(que possui algum dado retornado da API)
            const veiculo = resposta.data;

            //Enviando os dados recebidos para os Getters referentes a cada atributo
                //Lembrando sempre de converter os dados da forma correta
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

          //Parametro do useEffect
            //Sempre que o "id" tiver o seu valor alterado, o trecho de codigo dentro do "useEffect" será execultado novamente
      }, [id]);

    //Função para atualizar os dados
    function atualizar(){
            //Criando um "veiculo" do tipo "Veiculo"
                //Atribuindo os dados recebido da requisição anterior para "veiculo"
            let veiculo = new Veiculo();
            veiculo.id = Number.parseInt(Id);
            veiculo.marca = marca;
            veiculo.modelo = modelo;
            veiculo.precoAluguel = Number.parseInt(precoAluguel);
            veiculo.categoria = categoria;
            veiculo.status = Boolean(status);
            veiculo.integridade = Boolean(integridade);
            veiculo.combustivel = Number.parseInt(combustivel);
            
            //Enviando uma requisição para a API
            axios
            //Metodo HTTP "POST" e rota para qual a requisição vai ser enviada
                //Enviando o objeto "veiculo" juntamente a requisição para a API
                    //O "veiculo" esta sendo enviado junto com a requisição, para poder enviar os dados que foram atribuidos ao objeto para o servidor 
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
                //quando o valor da caixa de texto é alterado, é chamado o evento "onChange"
                    //Este evento recebe uma função que recebe "event" como parametro
                        // "event.target.value" está atribuindo o valor do "event"(no caso, o "value" vai ser oq foi digitado na caixa de texto) ao "Setter" de cada atributo do veiculo
                type="text"
                onChange={(event: any) => setMarca(event.target.value)}
                />
            </div>

            <div>
                <label>Modelo:</label>
                <input
                //quando o valor da caixa de texto é alterado, é chamado o evento "onChange"
                    //Este evento recebe uma função que recebe "event" como parametro
                        // "event.target.value" está atribuindo o valor do "event"(no caso, o "value" vai ser oq foi digitado na caixa de texto) ao "Setter" de cada atributo do veiculo
                type="text"
                onChange={(event: any) => setModelo(event.target.value)}
                />
            </div>

            <div>
                <label>Preco do Aluguel:</label>
                <input
                //quando o valor da caixa de texto é alterado, é chamado o evento "onChange"
                    //Este evento recebe uma função que recebe "event" como parametro
                        // "event.target.value" está atribuindo o valor do "event"(no caso, o "value" vai ser oq foi digitado na caixa de texto) ao "Setter" de cada atributo do veiculo
                type="text"
                onChange={(event: any) => setPrecoAluguel(event.target.value)}
                />
            </div>

            <div>
                <label>Categoria:</label>
                <input
                //quando o valor da caixa de texto é alterado, é chamado o evento "onChange"
                    //Este evento recebe uma função que recebe "event" como parametro
                        // "event.target.value" está atribuindo o valor do "event"(no caso, o "value" vai ser oq foi digitado na caixa de texto) ao "Setter" de cada atributo do veiculo
                type="text"
                onChange={(event: any) => setCategoria(event.target.value)}
                />
            </div>

            <div>
                <label>Status:</label>
                <input
                //quando o valor da caixa de texto é alterado, é chamado o evento "onChange"
                    //Este evento recebe uma função que recebe "event" como parametro
                        // "event.target.value" está atribuindo o valor do "event"(no caso, o "value" vai ser oq foi digitado na caixa de texto) ao "Setter" de cada atributo do veiculo
                type="text"
                onChange={(event: any) => setStatus(event.target.value)}
                />
            </div>

            <div>
                <label>Integridade:</label>
                <input
                //quando o valor da caixa de texto é alterado, é chamado o evento "onChange"
                    //Este evento recebe uma função que recebe "event" como parametro
                        // "event.target.value" está atribuindo o valor do "event"(no caso, o "value" vai ser oq foi digitado na caixa de texto) ao "Setter" de cada atributo do veiculo
                type="text"
                onChange={(event: any) => setIntegridade(event.target.value)}
                />
            </div>

            <div>
                <label>Combustivel:</label>
                <input
                //quando o valor da caixa de texto é alterado, é chamado o evento "onChange"
                    //Este evento recebe uma função que recebe "event" como parametro
                        // "event.target.value" está atribuindo o valor do "event"(no caso, o "value" vai ser oq foi digitado na caixa de texto) ao "Setter" de cada atributo do veiculo
                type="text"
                onChange={(event: any) => setCombustivel(event.target.value)}
                />
            </div>

            <div>
                <button onClick={atualizar}>
                    {/* Chama a função "atualizar" ao clicar no botão */}
                Atualizar
                </button>
            </div>
        </div>
    )
}
