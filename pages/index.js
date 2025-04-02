"use client";
import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [books, setBooks] = useState([]);

  // Obtener la lista de libros desde el API
  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then(setBooks);
  }, []);

  const addBook = async (book) => {
    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    const updatedBooks = await fetch("/api/books").then((res) => res.json());
    setBooks(updatedBooks);
  };

  const deleteBook = (id) => {
    fetch(`/api/books/${id}`, {
      method: "DELETE"
    }).then(() => {
      fetch("/api/books")
        .then((res) => res.json())
        .then(setBooks);
    });
  };

  const editBook = async (book) => {
    const newTitle = prompt("Ingrese el nuevo título:", book.title);
    const newAuthor = prompt("Ingrese el nuevo autor:", book.author);
    
    if (!newTitle || !newAuthor) return;
    
    await fetch(`/api/books/${book.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, author: newAuthor }),
    });
    
    const updatedBooks = await fetch("/api/books").then((res) => res.json());
    setBooks(updatedBooks);
  };

  return (
    <div className="h-screen p-4 max-w-2xl mx-auto space-y-4 mt-4 text-center text-lg">
      <h1 className="text-3xl font-bold mb-4">Gestión de Libros</h1>
      <BookForm onSubmit={addBook} />
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Título</th>
            <th className="border p-2">Autor</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">
                <Button className="mr-2" onClick={() => editBook(book)}>Editar</Button>
                <Button variant="destructive" className="mr-2" onClick={() => deleteBook(book.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
