//IMPORTANDO A REQUISIÇÃO E A RESPOSTA DO EXPRESS
import { Request, Response } from 'express';
import { Veiculo } from '../Models/veiculo.model';
import { Condutor } from '../Models/condutor.model'
import { prisma } from '../services/prisma';

//CRIANDO UM VETOR PARA ARMAZENAR OS VEICULOS
let veiculos : Veiculo[] = [];

//CRIANDO UM VETOR PARA ARMAZENAR OS COONDUTORES
let condutores : Condutor[] = [];

export class AlugarCarro{
    
  
    //
    //CRUD DO VEICULO
    //


    //CADASTRAR VEICULO
    async cadastrarVeiculoPost(request : Request, response : Response) : Promise<Response>{

        const novoVeiculo = await prisma.veiculo.create({
          data:{
            id:request.body.id,
            marca:request.body.marca,
            modelo:request.body.modelo,
            precoAluguel:request.body.precoAluguel,
            categoria:request.body.categoria,
            status:request.body.status,
            integridade:request.body.integridade,
            combustivel:request.body.combustivel,
          }
        })

        //Retornando um valor
        return response.status(201).json
        (
            { message : "Veiculo cadastrado com sucesso!", novoVeiculo }
        );
    }


    //ALTERAR DADOS DO VEICULO
    async alterarVeiculo(request : Request, response : Response) : Promise<Response> {
      const veiculoId = request.body.id; // Obtém o ID do veículo a ser alterado

      // Encontra o veículo pela id recebida
      const veiculo = await prisma.veiculo.findUnique({where: { id: veiculoId}});


      const { marca, modelo, precoAluguel, categoria, status, integridade, combustivel } = request.body; 
      // Obtém as novas informações do veículo
      
    
      // Se o veículo não for encontrado, retorna uma mensagem de erro
      if (!veiculo) {
        return response.status(404).json({ message: "Veículo não encontrado" });
      }
      
      // Atualiza as informações do veículo com os novos valores
      const attveiculo = await prisma.veiculo.update({where: { id: veiculoId},
        data:{marca, modelo, precoAluguel, categoria, status, integridade, combustivel}
      })
      


      
      // Retorna uma mensagem de sucesso com o veículo atualizado
      return response.json({ message: "Veículo atualizado", attveiculo });
    }


    //EXCLUIR VEICULO
      async excluirVeiculo(request: Request, response: Response): Promise<Response> {
        
        // Obtém o ID do veículo a ser excluído
        const veiculoId = request.body.id; 
        
        // Encontra o veículo pela id recebida
        const veiculo = await prisma.veiculo.findUnique({where: { id: veiculoId}});
      
        // Se o veículo não for encontrado, retorna uma mensagem de erro
        if (!veiculo) {
          return response.status(404).json({ message: "Veículo não encontrado" });
        }
      
        // Remove o veículo da lista
        await prisma.veiculo.delete({ where: { id: veiculoId }});
      
        // Retorna uma mensagem de sucesso
        return response.json({ message: "Veículo excluído" });
      }



    //LISTANDO TODOS VEICULOS
    async listarVeiculo(request : Request, response : Response) : Promise<Response>{
        
        const listaVeiculos = await prisma.veiculo.findMany();

        return response.status(200).json({ message : "Ok", listaVeiculos});
    }


    //
    //CRUD DO CONDUTOR
    //

    

    //CADASTRAR CONDUTOR
    async cadastrarCondutorPost(request : Request, response : Response) : Promise<Response>{
  
      const novoCondutor = await prisma.condutor.create({
        data: request.body,
      });

      if(novoCondutor.idade < 18){
        await prisma.condutor.delete({ where: { cpf: novoCondutor.cpf } });
        return response.status(400).json({ error: 'A idade mínima do condutor é 18 anos.' });
      }
      //Retornando um valor
        return response.status(201).json(
          { message : "Condutor cadastrado com sucesso!", novoCondutor }
      );
  }


    //ALTERAR DADOS DO VEICULO
    async alterarCondutor(request : Request, response : Response):Promise<Response>{
      // Obtém o "cpf" do "condutor" a ser alterado
      const condutorCPF = request.body.cpf;

      // Obtém as novas informações do "condutor"
      const { cpf, nome, idade, dinheiro} = request.body; 
    
      // Encontra o condutor pelo "cpf"
      const findCondutor = await prisma.condutor.findUnique({ where: { cpf: condutorCPF } });

      // Se o condutor não for encontrado, retorna uma mensagem de erro
      if (!findCondutor) {
        return response.status(404).json({ message: "Condutor não encontrado" });
      }
      
      // Não permite deixar o condutor menor de idade, retorna uma mensagem de erro
      if (findCondutor.idade < 18) {
        return response.status(404).json({ message: "O condutor deve ser maior de idade" });
      }

      // Atualiza as informações do condutor com os novos valores
      const updateCondutor = await prisma.condutor.update({
        where: {cpf: condutorCPF},
        data: {cpf, nome, idade, dinheiro},
      });
      

        // Retorna uma mensagem de sucesso com o veículo atualizado
        return response.json({ message: "Condutor atualizado", updateCondutor });
    }
    

    //EXCLUIR CONDUTOR
    async excluirCondutor(request: Request, response: Response): Promise<Response> {
      // Obtém o "cpf" do "condutor" a ser alterado
      const condutorCPF = request.body.cpf;
    
      const condutor = await prisma.condutor.findUnique({ where: { cpf: condutorCPF } });
      if (!condutor) {
        return response.status(404).json({ message: "Condutor não encontrado" });
      }
      
      await prisma.condutor.delete({ where: {cpf: condutorCPF}});
      // Retorna uma mensagem de sucesso
      return response.json({ message: "Condutor excluído" });
    }
    
    //LISTANDO TODOS CONDUTORES
    async listarCondutor(request : Request, response : Response) : Promise<Response>{
      const listarCondutores = await prisma.condutor.findMany();
      return response.status(200).json({ message : "Ok", listarCondutores});
    }


    //
    //CRUD ALUGAR
    //


    // ALUGAR VEÍCULO

    // async alugarVeiculo(request: Request, response : Response) : Promise<Response> {
      
    //   // Recebe o CPF e ID
    //   const condutorCPF = request.body.cpf;
    //   const veiculoId = request.body.id;
      
    //   // Encontra o índice do veículo na lista
    //   const veiculo = await prisma.veiculo.findUnique({where: {id: veiculoId}});
      
    //   // Encontra o condutor pelo "cpf"
    //   const condutor = await prisma.veiculo.findUnique({where: {cpf: condutorCPF}});
      
    //   // Se o condutor não for encontrado, retorna uma mensagem de erro
    //   if (!condutor) {
    //     return response.status(404).json({ message: "Condutor não encontrado" });
    //   }
    
    //   // Se o veículo não for encontrado, retorna uma mensagem de erro
    //   if (!veiculo) {
    //     return response.status(404).json({ message: "Veículo não encontrado" });
    //   }
    
    //   // Verifica se o veículo já está alugado


    //   // Pega o valor do aluguel do veículo
    //   let valorAluguel = await prisma.veiculo.findUnique({});

    //   // Pega o dinheiro que o condutor possui
    //   let dinheiroCondutor = condutor.dinheiro;

    //   // Pega a idade que o condutor possui
    //   const idadeCondutor = condutor.idade;

    //   // Adiciona uma taxa de 10% caso o condutor esteja entre 18 a 26 anos
    //   if (idadeCondutor >= 18 && idadeCondutor <= 26) {
    //     valorAluguel *= 1.1;
    //     // Verifica se o AINDA condutor possui renda para pagar o aluguel
    //     if (dinheiroCondutor < valorAluguel) {
    //     return response.status(400).json({ message: "Renda insuficiente" });
    //   }
    //     // confirma 
    //     if (dinheiroCondutor > valorAluguel) {
    //       // faz a diferença de valores
    //       dinheiroCondutor = dinheiroCondutor - valorAluguel;

    //       // Define o status do veículo como alugado
    //       veiculo.status = true;

    //       // Define o status do condutor como alugando
    //       condutor.alugando = true;

    //       return response.status(201).json({
    //         message: "Veículo alugado com sucesso!",
    //         condutores,
    //         veiculos,});
    //   }
    //   }

    //   // Verifica se o condutor possui renda para pagar o aluguel
    //   if (dinheiroCondutor < valorAluguel) {
    //     return response.status(400).json({ message: "Renda insuficiente" });
    //   }

    //   // Verifica se o veículo está disponível
    //   if (veiculo.status) {
    //     return response.status(400).json({ message: "Veículo já alugado" });
    //   }
    
    //   // Verifica se o condutor possui dinheiro suficiente para alugar o veículo
    //   const condutor = condutores[condutorIndex];
    //   if (condutor.dinheiro < veiculo.precoAluguel) {
    //     return response.status(400).json({ message: "Condutor não possui dinheiro suficiente para alugar o veículo" });
    //   }
    
    //   // Realiza o aluguel do veículo
    //   veiculo.status = true;
    //   condutor.alugando = true;
    //   condutor.dinheiro -= veiculo.precoAluguel;
    
    //   // Retorna a mensagem de sucesso
    //   return response.status(200).json({ message: "Veículo alugado com sucesso", veiculos: veiculo ,Condutores : condutores});
    // }
    
    

    // // DEVOLVER O VEÍCULO

    // devolverVeiculo(request: Request, response : Response) : Response{

    //   // Recebe o CPF e ID
    //   const condutorCPF = request.body.cpf;
    //   const veiculoId = request.body.id;
    //   const veiculoCombustivel = request.body.combustivel;
    //   const veiculoIntegridade = request.body.integridade;

      
    //   // Encontra o índice do veículo na lista
    //   const veiculoIndex = veiculos.findIndex((veiculo) => veiculo.id === veiculoId);

    //   // Encontra o condutor pelo "cpf"
    //   const condutorIndex = condutores.findIndex((condutor) => condutor.cpf === condutorCPF);

    //   // Se o condutor não for encontrado, retorna uma mensagem de erro
    //   if (condutorIndex === -1) {
    //     return response.status(404).json({ message: "Condutor não encontrado" });
    //   }

    //   // Se o veículo não for encontrado, retorna uma mensagem de erro
    //   if (veiculoIndex === -1) {
    //     return response.status(400).json({ message: "Veículo não encontrado!" });
    //   }

    //   // Recuperar o objeto do veículo e do condutor que foram encontrados nos arrays veiculos e condutores utilizando os índices veiculoIndex e condutorIndex obtidos previamente.
    //   const veiculo = veiculos[veiculoIndex];
    //   const condutor = condutores[condutorIndex];

    //   // Pega o valor do aluguel do veículo
    //   let valorAluguel = veiculo.precoAluguel;

    //   // Pega o dinheiro que o condutor possui
    //   let dinheiroCondutor = condutor.dinheiro;

    //   // Verifica se o veiculo está alugado
    //   if (veiculo.status === true) {
    //     return response.status(400).json({ message: "Veículo Indisponível!" });
    //   }

    //   // Verifica se o condutor está alugando
    //   if (condutor.alugando === true) {
    //     return response.status(400).json({ message: "Condutor só pode alugar um veículo por vez!" });
    //   }

    //   // Se o tanque não estiver cheio acrescenta mais 10% no valor do aluguel
    //   if (veiculo.combustivel < veiculoCombustivel) {
    //     valorAluguel *= 0.1;

    //     // Verifica se o condutor possui renda para pagar a taxa
    //     if (dinheiroCondutor < valorAluguel) {
    //       return response.status(400).json({ message: "Renda insuficiente" });
    //     } 
    //     dinheiroCondutor = dinheiroCondutor - valorAluguel;
    //   }

    //   // Se o veículo estiver danificado ou sujo acrescenta mais 10% no valor do aluguel
    //   if (veiculoIntegridade === false) {
    //     valorAluguel *= 0.1;

    //     // Verifica se o condutor possui renda para pagar a taxa
    //     if (dinheiroCondutor < valorAluguel) {
    //       return response.status(400).json({ message: "Renda insuficiente" });
    //     } 
    //     dinheiroCondutor = dinheiroCondutor - valorAluguel;
    //   }

    //   // Deixa o veículo com o status false "devolve o veículo"
    //   veiculo.status = false;
    //   condutor.alugando = false;

    //   // Devolve o veículo
    //   return response.status(201).json({
    //     message: "Veículo foi devolvido!",
    //     condutores,
    //     veiculos,
    //   });

    // }



}