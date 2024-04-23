const tasks = [];

function addTask(taskText) {
  tasks.push({ text: taskText, completed: false });
  updateTaskList();
}

function removeTask(taskIndex) {
  tasks.splice(taskIndex, 1);
  updateTaskList();
}

function toggleTaskCompletion(taskIndex) {
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  updateTaskList();
}

function clearAllTasks() {
  tasks.length = 0;
  updateTaskList();
}

function filterTasks(filterValue) {
  const filteredTasks = tasks.filter(task => {
    if (filterValue === 'all') {
      return true;
    } else if (filterValue === 'pending') {
      return !task.completed;
    } else { // filterValue === 'completed'
      return task.completed;
    }
  });
  displayTasks(filteredTasks);
}

function displayTasks(taskList) {
    const taskListElement = document.getElementById('tasks');
    taskListElement.innerHTML = ''; // Clear previous list items
  
    for (const [index, task] of taskList.entries()) {
      const listItem = document.createElement('li');
      listItem.textContent = task.text;
      listItem.classList.add(task.completed ? 'completed' : 'pending'); // Add CSS classes for styling
  
      const removeButton = document.createElement('button');
      removeButton.textContent = ' Remove';
      removeButton.addEventListener('click', () => removeTask(index));
      listItem.appendChild(removeButton);
  
      const completeButton = document.createElement('button');
      completeButton.textContent = task.completed ? 'Mark Pending' : 'Mark Complete';
      completeButton.addEventListener('click', () => toggleTaskCompletion(index));
      listItem.appendChild(completeButton);
  
      taskListElement.appendChild(listItem);
    }
  }
  
function updateTaskList() {
    const filterValue = document.getElementById('filter-select').value;
    filterTasks(filterValue);
  }
  
  const addButton = document.getElementById('add-button');
  addButton.addEventListener('click', function() {
    const newTaskText = document.getElementById('new-task').value;
    if (newTaskText) {
      addTask(newTaskText);
      document.getElementById('new-task').value = ''; // Clear input field after adding
    }
  });
  
  