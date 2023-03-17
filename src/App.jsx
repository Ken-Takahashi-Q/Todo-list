import { useEffect, useState } from 'react'
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
  const [tasks, setTasks] = useState([
    {name: "Complete online JavaScript course", completed: false},
    {name: "Jog around the park 3x", completed: false},
    {name: "10 minutes meditation", completed: false},
    {name: "Read for 1 hour", completed: false},
    {name: "Pick up groceries", completed: false},
    {name: "Complete Todo App on Frontend Mentor", completed: false}
  ]);

  const [checkbox, setCheckbox] = useState(Array(tasks.length).fill(false));
  const [completedTasks, setCompletedTasks] = useState([]);

  // add new task from input
  const handleAddTask = (e) => {
    if (e.key === "Enter") {
      const newTaskName = e.target.value;
      setTasks((prevTasks) => [...prevTasks, { name: newTaskName, completed: false }]);
      e.target.value = "";
    }
  };
  
  // make line across on text when ticked
  const handleCheckboxClick = (index) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[index] = { ...newTasks[index], completed: !newTasks[index].completed };
      return newTasks;
    });
  };

  // delete task when 'cross' is clicked
  const handleDelete = (index) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks.splice(index, 1);
      return newTasks;
    });
  };
  
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
              onKeyDown={handleAddTask}
              placeholder="Create a new todo..."
            />
        </div>

        <div className="todo">
        {tasks.map((task, index) => (
          <div className="task" key={index}>
            <div className="task-left">
              <div className="check-box" onClick={() => handleCheckboxClick(index)} style={{backgroundColor: task.completed ? "var(--bright-blue)" : "transparent"}}>
                {task.completed && <img src="src/images/icon-check.svg" alt="tick" />}
              </div>
              <p className={task.completed ? 'completed' : ''}>{task.name}</p>
            </div>

            <div className="delete-task" onClick={() => handleDelete(index)}>
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