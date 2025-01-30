-- CreateEnum
CREATE TYPE "type_game_status" AS ENUM ('playing', 'played', 'whishlist');

-- AlterTable
ALTER TABLE "tb_address" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "tb_phone" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "tb_user" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- DropEnum
DROP TYPE "type_game";

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
    "platinum" BOOLEAN,
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

-- AddForeignKey
ALTER TABLE "tb_list" ADD CONSTRAINT "tb_list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_game_list" ADD CONSTRAINT "tb_game_list_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "tb_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_played_games" ADD CONSTRAINT "tb_played_games_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_tips" ADD CONSTRAINT "tb_tips_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
