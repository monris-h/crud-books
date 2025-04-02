import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    // Actualizar un libro existente
    const { title, author } = req.body;
    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: { title, author },
    });
    return res.status(200).json(updatedBook);
  }

  if (req.method === "DELETE") {
    // Eliminar un libro
    await prisma.book.delete({
      where: { id: parseInt(id) },
    });
    return res.status(204).end();
  }
}
