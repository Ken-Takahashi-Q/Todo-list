import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [checkbox, setCheckbox] = useState(Array(task.length).fill(false));

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleCheckboxClick = (index) => {
    setCheckbox((prevCheckbox) => {
      const newCheckbox = [...prevCheckbox];
      newCheckbox[index] = !prevCheckbox[index];
      return newCheckbox;
    });
  };

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      return;
    }

    setTask((prevTasks) => [...prevTasks, newTask.trim()]);
    setNewTask('');
    setCheckbox((prevCheckboxes) => [...prevCheckboxes, false]);
  };

  return (
    <div className="App">
      <header>
        <img src={darkMode ? "src/images/bg-desktop-dark.jpg" : "src/images/bg-desktop-light.jpg"} alt="banner" />
      </header>

      <div className="todo-app">
        <div className="topbar">
          <h1>TODO</h1>
          <div className="theme-switch" onClick={() => setDarkMode(!darkMode)}>
            <img src={darkMode ? "src/images/icon-sun.svg" : "src/images/icon-moon.svg"} alt="sun" />
          </div>
        </div>

        <div className="create-new">
          <div className="check-box" style={{backgroundColor: checkbox ? "var(--check-bg)" : "transparent"}}>
            <img src="src/images/icon-check.svg" alt="tick" />
          </div>
          <div className="create-new-typing">
            <input
              placeholder="Create a new todo..."
            />
          </div>
        </div>

        <div className="todo">
          <div className="task">
            <div className="check-box">

            </div>
            <p>Complete online JavaScript course</p>
          </div>

          <div className="task">
            <div className="check-box">

            </div>
            <p>Jog around the park 3x</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default App
