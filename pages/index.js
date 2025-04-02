import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";

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
    // Actualizar la lista de libros sin recargar toda la página
    const updatedBooks = await fetch("/api/books").then((res) => res.json());
    setBooks(updatedBooks);
  };

  return (
    <div>
      <h1>Gestión de Libros</h1>
      <BookForm onSubmit={addBook} />
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} por {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
