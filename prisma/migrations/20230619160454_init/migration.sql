-- CreateTable
CREATE TABLE `Veiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `precoAluguel` DOUBLE NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `integridade` BOOLEAN NOT NULL,
    `combustivel` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Condutor` (
    `cpf` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `idade` INTEGER NOT NULL,
    `dinheiro` INTEGER NOT NULL,
    `alugando` BOOLEAN NOT NULL,

    UNIQUE INDEX `Condutor_cpf_key`(`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
