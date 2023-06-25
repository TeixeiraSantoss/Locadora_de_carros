//IMPORTANDO O "ROUTER" DO "EXPRESS"
import { Router } from "express";
import { AlugarCarro } from "../Controller/alugar.controller";

//DECLARANDO UMA ROTA E INSTANCIANDO EM MEMORIA
const router : Router = Router();

//CONFIGURAR TODAS AS ROTAS/URLs/ENDPOINTS DA APLICAÇÃO
router.post("/veiculo/cadastrar", new AlugarCarro().cadastrarVeiculoPost);
router.get("/veiculo/listar", new AlugarCarro().listarVeiculo);
router.get("/veiculo/buscar/:id", new AlugarCarro().buscarVeiculo);
router.post("/veiculo/alterar", new AlugarCarro().alterarVeiculo);
router.delete("/veiculo/exclui/:id", new AlugarCarro().excluirVeiculo);
router.post("/veiculo/alugar", new AlugarCarro().alugarVeiculo);
router.post("/veiculo/devolver", new AlugarCarro().devolverVeiculo);


router.post("/condutor/cadastrar", new AlugarCarro().cadastrarCondutorPost);
router.get("/condutor/listar", new AlugarCarro().listarCondutor);
router.post("/condutor/alterar/:cpf", new AlugarCarro().alterarCondutor);
router.delete("/condutor/excluir/:cpf", new AlugarCarro().excluirCondutor);




//EXPORTANDO O ROUTER PARA EU CONSEGUIR ACESSAR ELE EM OUTROS ARQUIVOS DO MEU PROJETO
export { router };