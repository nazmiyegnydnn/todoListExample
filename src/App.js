import './App.scss';


function App() {
  return (
     <div className='home'>
      <div className='homeMenu'>
      <div className='homeLeft'>
      <h2>KİTAP TÜRLERİ</h2>
      <ul>
        <li><button>ROMAN</button></li>
        <li><button>HİKAYE</button></li>
        <li><button>ŞİİR</button></li>
        <li><button>BİYOGRAFİ</button></li>
      </ul>
      </div>
      <div className='homeRight'>
      <h1>MY TODO LİST</h1>
      <input type='text' 
            className='todo-input' 
            placeholder='Add...'
            // onChange={inputTextHandler}
            // value={inputText}
            />
      <button className='add'>ADD</button>
      <div className='list'>
        <button className='completed'>Tamamlandı</button>
        <label>Todo</label>
        <button className='delete'>Sil</button>
      </div>
      </div>
      </div>
     </div>
  );
}

export default App;
