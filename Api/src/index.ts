//IMPORTANDO BIBLIOTECAS
import express from 'express';
import { router } from './Config/router';
import cors from "cors";

//CONSTANTE QUE VAI RECEBER O "express"
const app = express();

app.use(cors());

//CONFIGURANDO A APLICAÇÃO PARA RECEBER DADOS NO FORMATO ".json"
app.use(express.json());

//USANDO O ROUTER PARA ACESSAR AS FUNCIONALIDADES DA API
app.use(router);

//CONFIGURANDO A PORTA NA QUAL A APLICAÇÃO VAI RODAR
app.listen(3001, function(){
    console.clear();
    console.log("Aplicação rodando na porta 3001");
})