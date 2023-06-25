-- CreateTable
CREATE TABLE "Veiculo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "precoAluguel" REAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "integridade" BOOLEAN NOT NULL,
    "combustivel" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Condutor" (
    "cpf" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "dinheiro" INTEGER NOT NULL,
    "alugando" BOOLEAN NOT NULL
);
