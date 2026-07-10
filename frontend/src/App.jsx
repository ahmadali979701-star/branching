import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const loadBooks = () => {
    API.get("/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleSubmit = async () => {
    if (!title || !author) {
      alert("Please fill all fields.");
      return;
    }

    try {
      if (editingId) {
        await API.put(`/books/${editingId}`, {
          title,
          author,
        });

        setMessage("Book updated successfully!");
      } else {
        await API.post("/books", {
          title,
          author,
        });

        setMessage("Book added successfully!");
      }

      setTitle("");
      setAuthor("");
      setEditingId(null);
      loadBooks();

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    await API.delete(`/books/${id}`);

    setMessage("Book deleted successfully!");
    loadBooks();

    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setAuthor("");
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        textAlign: "center",
        fontFamily: "Arial",
      }}
    >
      <h1
  style={{
    textAlign: "center",
    fontSize: "64px",
    fontWeight: "bold",
    lineHeight: "1.1",
    marginBottom: "40px",
  }}
>
  📚 Library Management
  <br />
  System
</h1>

      {message && (
        <div
          style={{
            background: "#d4edda",
            color: "#155724",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
          }}
        >
          {message}
        </div>
      )}

      <h2>{editingId ? "Edit Book" : "Add Book"}</h2>

      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          margin: "5px",
        }}
      />

      <br />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          margin: "5px",
        }}
      />

      <br />

      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          margin: "10px",
          cursor: "pointer",
        }}
      >
        {editingId ? "Update Book" : "Add Book"}
      </button>

      {editingId && (
        <button
          onClick={cancelEdit}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      )}

      <hr />

      <h2>Books</h2>

      <input
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "350px",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      {filteredBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        filteredBooks.map((book) => (
          <div
            key={book.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{book.title}</h3>
            <p>{book.author}</p>

            <button
              onClick={() => handleEdit(book)}
              style={{
                marginRight: "10px",
                padding: "8px 15px",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(book.id)}
              style={{
                padding: "8px 15px",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;