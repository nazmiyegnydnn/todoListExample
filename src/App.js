import Logo from "./logo.png";
import { useEffect, useState } from "react";
import "./App.scss";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodos, setNewTodos] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [selectedFilter, setSelectedFilter] = useState("Tümü");

  const url = "https://jsonplaceholder.typicode.com/todos";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const initialTodos = data.slice(0, 5).map((item) => ({ ...item, category: "Analiz" }));
        setTodos(initialTodos);
      });
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
    setSelectedCategory("Tümü");
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
    const filteredData = todos?.filter((el) => el.id !== id);
    setTodos(filteredData);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredTodos = selectedFilter === "Tümü" ? todos : todos.filter((item) => item.category === selectedFilter);


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
            <option value="Tümü">Tümü</option>
            <option value="Analiz">Analiz</option>
            <option value="Geliştirme">Geliştirme</option>
            <option value="Test">Test</option>
          </select>
          <button className="add" onClick={addItem}>
            EKLE
          </button>
        </div>
        <select
          name="todosFilter"
          className="todoFilter"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <option value="Tümü">Tümü</option>
          <option value="Analiz">Analiz</option>
          <option value="Geliştirme">Geliştirme</option>
          <option value="Test">Test</option>
        </select>
      </div>
      <div className="todosCard">
        {filteredTodos.map((el, index) => (
          <div className="list" key={el.id}>
            <span className="indexId">{index + 1}</span>
            <p className={el.completed ? "passive" : ""}>{el.title}</p>
            <button className="completed" onClick={() => toggleCompleted(el.id)}>
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