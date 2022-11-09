import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(req, res) {
  // Create une annonce via vendors
  try {
    if (req.method === "POST") {
      const { image, titre, description, prixTache, sousCategorie } = req.body;

      console.log(req.body);

      const annonce = await prisma.annonce.create({
        data: {
          titre,
          description,
          prixTache,
          // Ici ça coince
          photos: { connect: { url: image } },
          sousCategorie: { connect: { id: sousCategorie } },
        },
      });
      res.status(200).json(annonce);
    } else {
      // HTTP method not supported!
      res.setHeader("Allow", ["POST"]);
      res
        .status(405)
        .json({ message: `HTTP method ${req.method} is not supported.` });
    }
  } catch (e) {
    res.status(400).json({ message: "La requete n'est pas passé", error: e });
  }
}
