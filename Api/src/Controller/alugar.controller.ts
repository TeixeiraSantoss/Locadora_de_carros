//IMPORTANDO A REQUISIÇÃO E A RESPOSTA DO EXPRESS
import { Request, Response } from 'express';
import { Veiculo } from '../Models/veiculo.model';
import { Condutor } from '../Models/condutor.model'
import { prisma } from '../services/prisma';
import { version } from 'os';

//CRIANDO UM VETOR PARA ARMAZENAR OS VEICULOS
let veiculos : Veiculo[] = [];

//CRIANDO UM VETOR PARA ARMAZENAR OS COONDUTORES
let condutores : Condutor[] = [];

export class AlugarCarro{
    
  
    //
    //CRUD DO VEICULO
    //


    //CADASTRAR VEICULO
    async cadastrarVeiculoPost(request : Request, response : Response) : Promise<Response> {
      try {
        const veiculo = {
          marca: request.body.marca,
          modelo: request.body.modelo,
          precoAluguel: request.body.precoAluguel,
          categoria: request.body.categoria,
          status: request.body.status,
          integridade: request.body.integridade,
          combustivel: request.body.combustivel,
        };
    
        const veiculoCadastrado = await prisma.veiculo.create({
          data: veiculo,
        });

        await prisma.veiculo.update({
          where: { id: veiculoCadastrado.id },
          data: { integridade: true },
        });

        return response.status(201).json({
          message: "Veiculo cadastrado com sucesso!",
          veiculo: veiculoCadastrado,
        });
        
      } catch (error) {
        console.error(error);
        return response
          .status(500)
          .json({ message: "Erro ao acessar o banco de dados" });
      }
    }
    


    //ALTERAR DADOS DO VEICULO
    async alterarVeiculo(request : Request, response : Response) : Promise<Response> {
      try {
        const veiculoId = request.params.id; // Obtém o ID do veículo a ser alterado
  
        // Encontra o veículo pela id recebida
        const veiculo = await prisma.veiculo.findUnique({where: { id: Number.parseInt(veiculoId)}});
  
  
        const { marca, modelo, precoAluguel, categoria, status, integridade, combustivel } = request.body; 
        // Obtém as novas informações do veículo
        
      
        // Se o veículo não for encontrado, retorna uma mensagem de erro
        if (!veiculo) {
          return response.status(404).json({ message: "Veículo não encontrado" });
        }
        
        // Atualiza as informações do veículo com os novos valores
        const attveiculo = await prisma.veiculo.update({where: { id: Number.parseInt(veiculoId)},
          data:{marca, modelo, precoAluguel, categoria, status, integridade, combustivel}
        })
    
        // Retorna uma mensagem de sucesso com o veículo atualizado
        return response.json({ message: "Veículo atualizado", attveiculo });
        
      } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Erro ao acessar o banco de dados" });

      }
    }


    //EXCLUIR VEICULO
    async excluirVeiculo(request: Request, response: Response): Promise<Response> {
      try {
        const veiculo = await prisma.veiculo.delete({where: { id: Number.parseInt(request.params.id)}});

        // Retorna uma mensagem de sucesso
        return response.json({ message: "Veículo excluído" , data: veiculo});

      } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Erro ao acessar o banco de dados" });

      }
    }



    //LISTANDO TODOS VEICULOS

    async listarVeiculo(request : Request, response : Response) : Promise<Response>{
        try {
          const listaVeiculos = await prisma.veiculo.findMany({});

          return response.status(200).json({ message : "Ok", dados: listaVeiculos});

        } catch (error) {
          console.error(error);
          return response.status(500).json({ message: "Erro ao acessar o banco de dados" });
        }
    }

    //BUSCAR VEICULO
    async buscarVeiculo(request: Request, response: Response): Promise<Response> {
      const veiculo = await prisma.veiculo.findUnique({
        where: {
          id: Number.parseInt(request.params.id),
        },
      });
      if (!veiculo) {
        return response.status(404).json({ message: "Veiculo não encontrado!" });
      }
      return response.status(200).json({ data: veiculo });
    }


    //
    //CRUD DO CONDUTOR
    //

    //CADASTRAR CONDUTOR
    async cadastrarCondutorPost(request : Request, response : Response) : Promise<Response>{
      try {
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
        
      } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Erro ao acessar o banco de dados" });

      }
  }


    //ALTERAR DADOS DO VEICULO
    async alterarCondutor(request : Request, response : Response):Promise<Response>{
      try {
        // Obtém o "cpf" do "condutor" a ser alterado
        const condutorCPF = request.params.cpf;
  
        // Obtém as novas informações do "condutor"
        const { nome, idade, dinheiro} = request.body; 
      
        // Encontra o condutor pelo "cpf"
        const findCondutor = await prisma.condutor.findUnique({ where: { cpf: Number.parseInt(condutorCPF) } });
  
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
          where: {cpf: Number.parseInt(condutorCPF)},
          data: { nome, idade, dinheiro},
        });
        
          // Retorna uma mensagem de sucesso com o veículo atualizado
          return response.json({ message: "Condutor atualizado", updateCondutor });
        
      } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Erro ao acessar o banco de dados" });

      }

    }

    //BUSCAR CONDUTOR
    async buscarCondutor(request: Request, response: Response): Promise<Response> {
      const condutor = await prisma.condutor.findUnique({
        where: {
          cpf: Number.parseInt(request.params.cpf),
        },
      });
      if (!condutor) {
        return response.status(404).json({ message: "Condutor não encontrado!" });
      }
      return response.status(200).json({ data: condutor });
    }
    

    //EXCLUIR CONDUTOR
    async excluirCondutor(request: Request, response: Response): Promise<Response> {
      try {
        // Obtém o "cpf" do "condutor" a ser deletado
        const condutor = await prisma.condutor.delete({ where: { cpf: Number.parseInt(request.params.cpf) } });
        // Retorna uma mensagem de sucesso
        return response.json({ message: "Condutor excluído" , data: condutor});
      } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Erro ao acessar o banco de dados" });

      }
    }
    
    //LISTANDO TODOS CONDUTORES
    async listarCondutor(request : Request, response : Response) : Promise<Response>{
      try {
        const listarCondutores = await prisma.condutor.findMany();
        return response.status(200).json({ message : "Ok", dados: listarCondutores});
        
      } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Erro ao acessar o banco de dados" });

      }
    }
    
    
    //
    //CRUD ALUGAR
    //
    
    
    // ALUGAR VEÍCULO
    
    async alugarVeiculo(request : Request, response : Response) : Promise<Response>{
      try {
        // Recebe o CPF e ID
        const condutorCPF = request.body.cpf;
        const veiculoId = request.body.id;
        
        // Encontra o veículo no banco de dados
        const veiculo = await prisma.veiculo.findUnique({ where: { id: veiculoId } });
        
        // Encontra o condutor no banco de dados
        const condutor = await prisma.condutor.findUnique({ where: { cpf: condutorCPF } });
        
        // Se o condutor não for encontrado, retorna uma mensagem de erro
        if (!condutor) {
          return response.status(404).json({ message: "Condutor não encontrado" });
        }
      
        // Se o veículo não for encontrado, retorna uma mensagem de erro
        if (!veiculo) {
          return response.status(404).json({ message: "Veículo não encontrado" });
        }
      
        // Verifica se o veículo já está alugado
        if (veiculo.status) {
          return response.status(400).json({ message: "Veículo já alugado" });
        }
    
        // Pega o valor do aluguel do veículo
        let valorAluguel = veiculo.precoAluguel;
    
        // Pega o dinheiro que o condutor possui
        let dinheiroCondutor = condutor.dinheiro;
    
        // Pega a idade que o condutor possui
        const idadeCondutor = condutor.idade;
    
        // Adiciona uma taxa de 10% caso o condutor esteja entre 18 a 26 anos
        if (idadeCondutor >= 18 && idadeCondutor <= 26) {
          valorAluguel *= 1.1;
        }
    
        // Verifica se o condutor possui renda para pagar o aluguel
        if (dinheiroCondutor < valorAluguel) {
          return response.status(400).json({ message: "Renda insuficiente" });
        }
    
        // Realiza o aluguel do veículo
        veiculo.status = true;
        condutor.alugando = true;
        condutor.dinheiro -= valorAluguel;
    
        // Atualiza os dados no banco de dados
        await prisma.veiculo.update({
          where: { id: veiculoId },
          data: { status: veiculo.status }
        });
    
        await prisma.condutor.update({
          where: { cpf: condutorCPF },
          data: { alugando: condutor.alugando, dinheiro: condutor.dinheiro }
        });
    
        // Retorna a mensagem de sucesso
        return response.status(200).json({ message: "Veículo alugado com sucesso", veiculo, condutor });
        
      } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Erro ao acessar o banco de dados" });
      }
    }
    

    // DEVOLVER O VEÍCULO

    async devolverVeiculo(request: Request, response: Response): Promise<Response> {
      try {
        // Recebe o CPF e ID
        const condutorCPF = request.body.cpf;
        const veiculoId = request.body.id;
        const veiculoCombustivel = request.body.combustivel;
        const veiculoIntegridade = request.body.integridade;
    
        // Encontra o veículo no banco de dados
        const veiculo = await prisma.veiculo.findUnique({ where: { id: veiculoId } });
    
        // Encontra o condutor no banco de dados
        const condutor = await prisma.condutor.findUnique({ where: { cpf: condutorCPF } });
    
        // Se o condutor não for encontrado, retorna uma mensagem de erro
        if (!condutor) {
          return response.status(404).json({ message: "Condutor não encontrado" });
        }
    
        // Se o veículo não for encontrado, retorna uma mensagem de erro
        if (!veiculo) {
          return response.status(400).json({ message: "Veículo não encontrado!" });
        }
    
        // Pega o valor do aluguel do veículo
        let valorAluguel = veiculo.precoAluguel;
    
        // Pega o dinheiro que o condutor possui
        let dinheiroCondutor = condutor.dinheiro;
    
        // Se o tanque não estiver cheio, acrescenta mais 10% no valor do aluguel
        if (veiculo.combustivel < veiculoCombustivel) {
          valorAluguel *= 1.1;
    
          // Verifica se o condutor possui renda para pagar a taxa
          if (dinheiroCondutor < valorAluguel) {
            return response.status(400).json({ message: "Renda insuficiente" });
          }
    
          dinheiroCondutor -= valorAluguel;
        }
    
        // Se o veículo estiver danificado ou sujo, acrescenta mais 10% no valor do aluguel
        if (veiculoIntegridade === false) {
          valorAluguel *= 1.1;
    
          // Verifica se o condutor possui renda para pagar a taxa
          if (dinheiroCondutor < valorAluguel) {
            return response.status(400).json({ message: "Renda insuficiente" });
          }
    
          dinheiroCondutor -= valorAluguel;
        }
    
        // Atualiza o status do veículo no banco de dados
        await prisma.veiculo.update({
          where: { id: veiculoId },
          data: { status: false },
        });
    
        // Atualiza o status do condutor no banco de dados
        await prisma.condutor.update({
          where: { cpf: condutorCPF },
          data: { alugando: false, dinheiro: dinheiroCondutor },
        });
    
        // Retorna a mensagem de sucesso
        return response.status(201).json({
          message: "Veículo foi devolvido!",
          condutor,
          veiculo,
        });


      } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Erro ao acessar o banco de dados" });
      }
    }
    


}
