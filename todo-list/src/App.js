import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [amountOfTodos, setAmountOfTodos] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [currId, setCurrId] = useState(0);

  useEffect(() => {
    console.log('init loading');
    setTasks(() => {
      console.log('loading data');
      const data = JSON.parse(window.localStorage.getItem('tasks'));
      console.log('data loaded');
      console.log(data);
      console.log('length : ' + data.length)
      setAmountOfTodos(data.length); 
      console.log('loading currId');
      const initId = JSON.parse(window.localStorage.getItem('currId'));
      console.log(' init curr id : ' + currId);
      setCurrId(initId);
      return data;
    });   
  }, []); 


  useEffect(() => {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
    window.localStorage.setItem('currId', JSON.stringify(currId));
    if(amountOfTodos > 0){
      document.title = `Todo's left : ${amountOfTodos}`;
    } else {
      document.title = "No Todo's left";
    }
    
    console.log('currId : ' + currId);
  }, [tasks]);

  const addElem = () => {
    const tField = document.getElementById('input');
    const text = tField.value;
    const currTasks = [...tasks];
    if(text !== ''){
      currTasks.push({
        text: text,
        id : currId,
      })
      setCurrId(currId + 1);
      setTasks(currTasks);
      setAmountOfTodos(amountOfTodos + 1);
    }
    console.log(tasks);
    tField.value = '';
    tField.focus();
  }  

  const removeElem = (idToDelete) => {
    console.log(`trying to remove elem # ${idToDelete}`)
    const currTasks = tasks.filter((task) => {
      if(task.id === idToDelete){
        setAmountOfTodos(amountOfTodos - 1);
        return false;
      } else {
        return true;
      }
    })
    setTasks(currTasks);
  }

  const removeAll = () => {
    setTasks([]);
    setAmountOfTodos(0);
    setCurrId(0);
  }

  return (
      <div className="App">
        <h1>Todo List Example</h1>
        <ul>
          {tasks.map((task) => {
            const {text, id} = task;
            //console.log(text + " " + id);
            return (
              <li key={id}>
              <div className='todo-item'>
                <p>{text}</p>
                <button className='remove-todo-btn' onClick={() => {
                  console.log(`trying to remove elem # ${id}`);
                  removeElem(id)
                  }}>&#10060;</button>
                </div>
              </li>
            );
          })}
          <li>
            <div className='submit-form'>
              <input className='input-field' type='textfield' id='input'/>
              <button className='add-todo-btn' onClick={addElem}>+</button>
            </div>
          </li>
          <li>
            <button className='remove-all-btn' onClick={removeAll}>Clear</button>
          </li>
        </ul>
        <AppFooter/>
      </div>
    );
}

const AppFooter = () => {
  return(
    <div className='footer'>
      <p>Author : TMBKoreN-</p>
    </div>
  );
}



 

export default App;
