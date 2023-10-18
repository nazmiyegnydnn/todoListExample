import Logo from "./logo.png";
import { useEffect, useState } from "react";
import "./App.scss";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodos, setNewTodos] = useState("");
  const [statu, setStatu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("selectCategory");

  const url = "https://jsonplaceholder.typicode.com/todos";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((todos) =>
        setTodos(
          todos
            .slice(0, 5)
            ?.map((item) => ({ ...item, category: "Çok Önemli" }))
        )
      );
  }, []);
  console.log(todos);

  const handleInput = (e) => {
    setNewTodos(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const addItem = () => {
    const newItem = {
      id: todos.length + 1,
      title: newTodos,
      completed: false,
      category: selectedCategory,
    };
    setTodos([...todos, newItem]);
    setNewTodos("");
  };

  const toggleCompleted = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };
  const deleteClick = (id) => {
    const deleteFilter = todos?.filter((el) => el.id !== id);
    setTodos(deleteFilter);
  };
  return (
    <div className="home">
      <div className="homeHeader">
        <img src={Logo} alt="Logo" />
        <h1>To-do List</h1>
      </div>
      <div className="todoList">
        <div className="todoMenu">
        <input
          type="text"
          className="todo-input"
          placeholder="Add..."
          onChange={handleInput}
          value={newTodos}
        />
            <select
              name="todos"
              className="filter-todo"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="selectCategory" disabled selected>
                Kategori Seç
              </option>
              <option value="important">Önemli</option>
              <option value="very-important">Çok Önemli</option>
              <option value="less-important">Az Önemli</option>
            </select>
            <button className="add" onClick={addItem}>
              EKLE
            </button>
          </div>
          <select
            name="todosFilter"
            className="todoFilter"
            // value={selectedCategory}
            // onChange={handleCategoryChange}
          >
            <option value="selectCategory" disabled selected>
              Filtreleme
            </option>
            <option value="important">Önemli</option>
            <option value="very-important">Çok Önemli</option>
            <option value="less-important">Az Önemli</option>
          </select>
      </div>
      <div className="todosCard">
        {todos.map((el, index) => (
          <div className="list" key={el.userId}>
            <span className="indexId">{index + 1}</span>
            <p className={el.completed === true || statu ? "passive" : ""}>
              {el.title}
            </p>
            <button
              className="completed"
              onClick={() => toggleCompleted(el.id)}
            >
              Tamamlandı
            </button>
            <button className="delete" onClick={() => deleteClick(el.id)}>
              Sil
            </button>
            <span>{el.completed ? "Tamamlandı" : "Tamamlanmadı"}</span>
            <span className="category">Kategori: {el.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
