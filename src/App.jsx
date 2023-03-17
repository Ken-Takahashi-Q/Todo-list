import { useEffect, useState } from 'react'
import './App.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
  // Dark mode
  const [darkMode, setDarkMode] = useState(true);
  const root = document.querySelector(':root');

  // Set the default to dark mode
  useEffect(() => {
		root.dataset.theme = 'dark';
	}, []);
	
	const themeChange = () => {
		setDarkMode(!darkMode);
		root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
	};

  // default tasks list
  const [tasks, setTasks] = useState([
    {name: "Complete online JavaScript course", completed: false},
    {name: "Jog around the park 3x", completed: false},
    {name: "10 minutes meditation", completed: false},
    {name: "Read for 1 hour", completed: false},
    {name: "Pick up groceries", completed: false},
    {name: "Complete Todo App on Frontend Mentor", completed: false}
  ]);

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
  
  // show all tasks
  const [showAll, setShowAll] = useState(true);
  const [showActive, setShowActive] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleShowAll = () => {
    setShowAll(true);
    setShowActive(false);
    setShowCompleted(false);
  };

  // show active
  const handleShowActive = () => {
    setShowAll(false);
    setShowActive(true);
    setShowCompleted(false);
  };
  
  // show ticked
  const handleShowCompleted = () => {
    setShowAll(false);
    setShowActive(false);
    setShowCompleted(true);
  };

  // delete task completed
  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  // drag and drop (not using)
  const handleDragEnd = (result) => {
    if (!result.destination) return;
  
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
  
    setTasks(items);
  };

  return (
    <div className="App">
      <header>
        <img src={darkMode ? "/images/bg-desktop-dark.jpg" : "/images/bg-desktop-light.jpg"} alt="banner" />
      </header>

      <div className="todo-app">
        <div className="topbar">
          <h1>TODO</h1>
          <div className="theme-switch" onClick={themeChange}>
            <img src={darkMode ? "/images/icon-sun.svg" : "/images/icon-moon.svg"} alt="sun" />
          </div>
        </div>

        <div className="create-new">
            <input 
              onKeyDown={handleAddTask}
              placeholder="Create a new todo..."
            />
        </div>

        
        <div className="todo">
          {tasks.map((task, index) => {
            if ((showActive && task.completed) || (showCompleted && !task.completed)) {
              return null;
            }
            return (
              <div className="task" key={index}>
                <div className="task-left">
                  <div className="check-box"
                    onClick={() => handleCheckboxClick(index)}
                    style={{backgroundColor: task.completed ? "var(--bright-blue)" : "transparent"}}
                  >
                    {task.completed && <img src="/images/icon-check.svg" alt="tick" />}
                  </div>

                  <p
                    className={task.completed ? 'completed' : ''}
                    onClick={() => handleCheckboxClick(index)}
                  >
                    {task.name}
                  </p>
                </div>
  
                {/* cross icon */}
                <div className="delete-task" onClick={() => handleDelete(index)}>
                  <img src="/images/icon-cross.svg" alt="close" />
                </div>
              </div>
            )
          })}

          <div className="details">
            {/* show number of incompleted task(s) */}
            <p>{tasks.filter(task => !task.completed).length} item{tasks.filter(task => !task.completed).length > 1 ? 's' : ''} left</p>

            <div className="menus">
              <p className="menus-text primary" onClick={handleShowAll}>All</p>
              <p className="menus-text" onClick={handleShowActive}>Active</p>
              <p className="menus-text" onClick={handleShowCompleted}>Completed</p>
            </div>

            <div className="clear-completed" onClick={handleClearCompleted}>
              <p>Clear Completed</p>
            </div>
          </div>

          <div className="details mobile">
            <p className="menus-text primary" onClick={handleShowAll}>All</p>
            <p className="menus-text" onClick={handleShowActive}>Active</p>
            <p className="menus-text" onClick={handleShowCompleted}>Completed</p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default App;