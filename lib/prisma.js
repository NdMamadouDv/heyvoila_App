import { PrismaClient } from "@prisma/client";
import slugify from "slugify";
let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

prisma.$use(async (params, next) => {
  if (
    (params.action === "create" || params.action === "update") &&
    ["Annonce", "SousCategorie", "Categorie"].includes(params.model)
  ) {
    let {
      args: { data },
    } = params;
    // Check if slug exists by `findUnique` (did not test)
    data.slug = slugify(`${data.name}`, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });
  }
  const result = await next(params);
  return result;
});
export default prisma;
