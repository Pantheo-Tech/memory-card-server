-- CreateEnum
CREATE TYPE "type_user" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "type_phone" AS ENUM ('casa', 'trabalho', 'celular');

-- CreateEnum
CREATE TYPE "type_address" AS ENUM ('casa', 'trabalho');

-- CreateEnum
CREATE TYPE "type_game_status" AS ENUM ('playing', 'played', 'whishlist');

-- CreateTable
CREATE TABLE "tb_user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT,
    "birthday" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "lostPassword" TEXT,
    "type" "type_user" NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_phone" (
    "id" SERIAL NOT NULL,
    "country_code" TEXT NOT NULL,
    "area_code" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "type" "type_phone" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "type" "type_address" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_list" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(150),
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_game_list" (
    "id" SERIAL NOT NULL,
    "list_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_game_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_played_games" (
    "id" SERIAL NOT NULL,
    "platinum" BOOLEAN NOT NULL DEFAULT false,
    "achievements" TEXT NOT NULL,
    "status" "type_game_status" NOT NULL,
    "game_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_played_games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_tips" (
    "id" SERIAL NOT NULL,
    "subject" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "dislikes" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_tips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_genres" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "game_count" BIGINT NOT NULL,
    "img" TEXT,

    CONSTRAINT "tb_genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_stores" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "game_count" BIGINT NOT NULL,
    "img" TEXT,

    CONSTRAINT "tb_stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_platforms" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "game_count" BIGINT NOT NULL,
    "img" TEXT,

    CONSTRAINT "tb_platforms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "tb_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_cpf_key" ON "tb_user"("cpf");

-- AddForeignKey
ALTER TABLE "tb_phone" ADD CONSTRAINT "tb_phone_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_address" ADD CONSTRAINT "tb_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_list" ADD CONSTRAINT "tb_list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_game_list" ADD CONSTRAINT "tb_game_list_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "tb_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_played_games" ADD CONSTRAINT "tb_played_games_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_tips" ADD CONSTRAINT "tb_tips_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
