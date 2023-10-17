import Logo from "./logo.png";
import { useEffect, useState } from "react";
import "./App.scss";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodos, setNewTodos] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("selectCategory"); 

  const url = "https://jsonplaceholder.typicode.com/todos";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((todos) => setTodos(todos.slice(0, 5)));
  }, []);

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

  return (
    <div className="home">
      <div className="homeHeader">
        <img src={Logo} alt="Logo" />
        <h1>To-do List</h1>
      </div>
      <div className="todoList">
        <input
          type="text"
          className="todo-input"
          placeholder="Add..."
          onChange={handleInput}
          value={newTodos}
        />
        <div className="select">
          <select
            name="todos"
            className="filter-todo"
            value={selectedCategory} 
            onChange={handleCategoryChange}
          >
            <option value="selectCategory" disabled selected>Kategori Seç</option>
            <option value="important">Önemli</option>
            <option value="very-important">Çok Önemli</option>
            <option value="less-important">Az Önemli</option>
          </select>
          <button className="add" onClick={addItem}>
            ADD
          </button>
        </div>
      </div>
      <div className="todosCard">
        {todos.map((el) => (
          <div className="list" key={el.id}>
            <span>{el.id}</span>
            <p>{el.title}</p>
            <span>{el.completed ? "Tamamlandı" : "Tamamlanmadı"}</span>
            <span>Kategori: {el.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;