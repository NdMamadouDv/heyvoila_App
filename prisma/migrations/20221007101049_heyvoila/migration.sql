-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Utilisateur', 'Vendeur', 'Client');

-- CreateTable
CREATE TABLE "Annonce" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix_heure" DOUBLE PRECISION NOT NULL,
    "prix_journee" DOUBLE PRECISION NOT NULL,
    "prix_mois" DOUBLE PRECISION NOT NULL,
    "prix_tache" DOUBLE PRECISION NOT NULL,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "misAJourLe" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Annonce_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotoAnnonce" (
    "id" SERIAL NOT NULL,
    "height" INTEGER NOT NULL,
    "Width" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "PhotoAnnonce_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "note" INTEGER NOT NULL,
    "commentaire" TEXT NOT NULL,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "misAJourLe" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorie" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "emailUtilisateur" TEXT NOT NULL,
    "nomUtilisateur" TEXT NOT NULL,
    "prenomUtilisateur" TEXT NOT NULL,
    "photoUtilisateur" TEXT[],
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "misAJourLe" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Utilisateur" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo" TEXT[],
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Utilisateur'
);

-- CreateIndex
CREATE UNIQUE INDEX "Categorie_slug_key" ON "Categorie"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_emailUtilisateur_key" ON "Profile"("emailUtilisateur");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");
