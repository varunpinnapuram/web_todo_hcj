// script.js - Simple Todo app with localStorage persistence (vanilla JS)
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const status = document.getElementById('status');
const clearCompletedBtn = document.getElementById('clear-completed');
const clearAllBtn = document.getElementById('clear-all');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
  render();
}

function render() {
  list.innerHTML = '';
  if (todos.length === 0) {
    status.textContent = 'No tasks yet — add one above.';
    return;
  }
  status.textContent = '';
  todos.forEach((t, idx) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (t.completed ? ' completed' : '');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = t.completed;
    checkbox.addEventListener('change', () => {
      todos[idx].completed = checkbox.checked;
      save();
    });

    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = t.text;

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.addEventListener('click', () => {
      todos.splice(idx, 1);
      save();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, completed: false, created: new Date().toISOString() });
  input.value = '';
  save();
});

clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter(t => !t.completed);
  save();
});

clearAllBtn.addEventListener('click', () => {
  if (!confirm('Clear all tasks?')) return;
  todos = [];
  save();
});

render();
