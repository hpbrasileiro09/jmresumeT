-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "entries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_id" INTEGER NOT NULL DEFAULT 0,
    "dt_entry" DATETIME NOT NULL,
    "vl_entry" REAL NOT NULL,
    "nm_entry" TEXT NOT NULL,
    "ds_category" TEXT NOT NULL,
    "ds_subcategory" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "fixed_costs" INTEGER NOT NULL,
    "checked" INTEGER NOT NULL,
    "published" INTEGER NOT NULL,
    "ds_detail" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mysql_id" INTEGER NOT NULL,
    CONSTRAINT "entries_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "published" INTEGER NOT NULL,
    "vl_prev" REAL NOT NULL,
    "day_prev" INTEGER NOT NULL,
    "ordem" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "params" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "default" TEXT NOT NULL,
    "dt_params" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "mysql_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "fichas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "habilidade" TEXT NOT NULL,
    "energia" TEXT NOT NULL,
    "sorte" TEXT NOT NULL,
    "provisoes" TEXT NOT NULL,
    "transformacao" TEXT NOT NULL,
    "equipamentos" TEXT NOT NULL,
    "outro" TEXT NOT NULL,
    "notas_senhas" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "published" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "notas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ficha_id" INTEGER NOT NULL DEFAULT 0,
    "descricao" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "published" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notas_ficha_id_fkey" FOREIGN KEY ("ficha_id") REFERENCES "fichas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "encontros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ficha_id" INTEGER NOT NULL DEFAULT 0,
    "nome" TEXT NOT NULL,
    "habilidade" TEXT NOT NULL,
    "energia" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "published" INTEGER NOT NULL,
    "em_combate" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "encontros_ficha_id_fkey" FOREIGN KEY ("ficha_id") REFERENCES "fichas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
