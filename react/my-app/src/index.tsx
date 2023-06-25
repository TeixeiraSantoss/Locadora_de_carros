import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CadastrarVeiculo } from "./componentes/paginas/Cadastra.veiculo";
import { ListarVeiculo } from "./componentes/paginas/Listar.veiculo";
import { AtualizarVeiculo } from "./componentes/paginas/Atualizar.veiculo";
import { CadastrarCondutor } from "./componentes/paginas/Cadastra.condutor";
import { ListarCondutor } from "./componentes/paginas/Listar.condutor";
import { AtualizarCondutor } from "./componentes/paginas/Atualizar.condutor";
import { AlugarVeiculo } from "./componentes/paginas/Alugar.veiculo";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <CadastrarVeiculo />,
      },
      {
        path: "/veiculo/cadastrar",
        element: <CadastrarVeiculo />,
      },
      {
        path: "/veiculo/listar",
        element: <ListarVeiculo />,
      },
      {
        path: "/veiculo/alterar",
        element: <AtualizarVeiculo />,
      },
      {
        path: "/condutor/cadastrar",
        element: <CadastrarCondutor />,
      },
      {
        path: "/condutor/listar",
        element: <ListarCondutor />,
      },
      {
        path: "/condutor/alterar",
        element: <AtualizarCondutor />,
      },
      {
        path: "/veiculo/alugar/:id",
        element: <AlugarVeiculo />,
      },
      {
        path: "veiculo/alterar/:id",
        element: <AtualizarVeiculo />,
      },
      {
        path: "condutor/alterar/:cpf",
        element: <AtualizarCondutor />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
