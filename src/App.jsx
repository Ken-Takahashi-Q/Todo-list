import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  // Dark mode
  const [darkMode, setDarkMode] = useState(true);
  const root = document.querySelector(':root');
	
	const themeChange = () => {
		setDarkMode(!darkMode);
		root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
	};

  // Tasks list
  const [tasks, setTasks] = useState(["Complete online JavaScript course", "Jog around the park 3x", "10 minutes meditation", "Read for 1 hour", "Pick up groceries", "Complete Todo App on Frontend Mentor"]);
  const [newTask, setNewTask] = useState('');
  const [checkbox, setCheckbox] = useState(Array(tasks.length).fill(false));

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

    setTasks((prevTasks) => [...prevTasks, newTask.trim()]);
    setNewTask('');
    setCheckbox((prevCheckboxes) => [...prevCheckboxes, false]);
  };

  const handleDelete = (index) => {

  }

  return (
    <div className="App">
      <header>
        <img src={darkMode ? "src/images/bg-desktop-dark.jpg" : "src/images/bg-desktop-light.jpg"} alt="banner" />
      </header>

      <div className="todo-app">
        <div className="topbar">
          <h1>TODO</h1>
          <div className="theme-switch" onClick={themeChange}>
            <img src={darkMode ? "src/images/icon-sun.svg" : "src/images/icon-moon.svg"} alt="sun" />
          </div>
        </div>

        <div className="create-new">
            <input
              placeholder="Create a new todo..."
            />
        </div>

        <div className="todo">
          {tasks.map((task, index) => (
            <div className="task" key={index}>
              <div className="task-left">
                <div className="check-box" style={{backgroundColor: checkbox ? "var(--check-bg)" : "transparent"}}>
                  <img src="src/images/icon-check.svg" alt="tick" />
                </div>
                <p>{task}</p>
              </div>
              
              <div className="delete-task" onClick={handleDelete}>
                <img src="src/images/icon-cross.svg" alt="close" />
              </div>
              
            </div>
          ))}

        </div>

      </div>

    </div>
  )
}

export default App;