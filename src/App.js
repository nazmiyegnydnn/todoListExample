import Logo from "./logo.png";
import { useState ,useEffect} from "react";
import "./App.scss";
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodos, setNewTodos] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [selectedFilter, setSelectedFilter] = useState("Tümü");


//POST İŞLEMİ YAPIP TEKRAR GET YAPĞACAĞIMIZ İÇİN 2 DEFA YAPMADIK FONK TANIMLAYIP ÇAĞIRDIK
// const getData = ()=>{
//      fetch("https://jsonplaceholder.typicode.com/todos"
//       .then((res) => res.json())
//       .then((data) => {
//         const initialTodos = data.slice(0, 5).map((item) => ({ ...item, category: "Analiz" }));
//         setTodos(initialTodos);
//       });
// }
//   useEffect(() => {
//    getData()
//   }, []);

//   useEffect(() => {
//  fetch("https://jsonplaceholder.typicode.com/todos")
//       .then((res) => res.json())
//       .then((data) => {
//         const initialTodos = data.slice(0, 5).map((item) => ({ ...item, category: "Analiz" }));
//         setTodos(initialTodos);
//       });
//   }, []);



useEffect(() => {
  axios
    .get('https://jsonplaceholder.typicode.com/todos')
    .then((response) => {
      const initialTodos = response.data.slice(0, 5).map((item) => ({ ...item, category: "Analiz" }));
      setTodos(initialTodos);
    })
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
    //POST İŞLEMİ
  //   fetch('https://jsonplaceholder.typicode.com/todos', {
  //   method: 'POST',
  //   body: JSON.stringify(newItem),
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8',
  //   },
  // })
  // .then((response) => response.json())
  //   .then((json) => console.log(json));
  //  getData()
    setTodos([...todos , newItem])
    setNewTodos("");
    setSelectedCategory("Tümü");
    // setSelectedFilter("Tümü")
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

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

const filteredTodos = () => {
  if (selectedFilter === "Tümü") {
    return todos;
  } else {
    const filteredItems = todos.filter((item) => item.category === selectedFilter);
    return filteredItems;
  }
}
const todoFilter = filteredTodos();

// const handleFilterOrdered = (e) => {  Sıralama işlemi yaptıracağım sonra
//   setOrderedFilter(e.target.value);
// };
// const handleFilterChange = (e) => {
//   const selectedValue = e.target.value;
//   setSelectedFilter(selectedValue);

//   if (selectedValue === "Tümü") {
//     // Eğer "Tümü" seçildiyse, filtreyi uygulamadan tüm todos'u göster
//     setTodos(todos); // orijinal veriyi geri yükle
//   } else {
//     const filteredItems = todos.filter((item) => item.category === selectedValue);
//     setTodos(filteredItems); // filtreyi uygula ve todos'u güncelle
//   }
// };


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
        {todoFilter.map((el, index) => (
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