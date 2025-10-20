// State todos
let todos = [];

// DOM references
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const filterButtons = document.querySelectorAll(".filter-btn");
const totalCount = document.getElementById("total-count");
const activeCount = document.getElementById("active-count");
const completedCount = document.getElementById("completed-count");

// Initialize from localStorage
loadTodos();

// Event listeners
todoForm.addEventListener("submit", addTodo);
filterButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => filterTodos(e, btn.dataset.filter));
});

function addTodo(e) {
  e.preventDefault();

  const text = todoInput.value.trim();
  if (text === "") return;

  const todo = {
    id: Date.now(),
    text,
    completed: false,
  };

  todos.push(todo);
  todoInput.value = "";

  saveTodos();
  renderTodos();
  updateStats();
}

function renderTodos(list = todos) {
  todoList.innerHTML = "";

  list.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;

    li.innerHTML = `
      <span class="todo-text">${todo.text}</span>
      <div class="todo-actions">
        <button class="toggle" aria-label="Tandai selesai">✓</button>
        <button class="delete" aria-label="Hapus">×</button>
      </div>
    `;

    li.querySelector(".toggle").addEventListener("click", () =>
      toggleTodo(todo.id)
    );
    li.querySelector(".delete").addEventListener("click", () =>
      deleteTodo(todo.id)
    );

    todoList.appendChild(li);
  });
}

function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;
  todo.completed = !todo.completed;
  saveTodos();
  renderTodos();
  updateStats();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  renderTodos();
  updateStats();
}

function filterTodos(event, filter) {
  // Update active state and aria-pressed
  filterButtons.forEach((btn) => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  let filtered = todos;
  if (filter === "active") {
    filtered = todos.filter((t) => !t.completed);
  } else if (filter === "completed") {
    filtered = todos.filter((t) => t.completed);
  }

  renderTodos(filtered);
}

function updateStats() {
  totalCount.textContent = todos.length;
  activeCount.textContent = todos.filter((t) => !t.completed).length;
  completedCount.textContent = todos.filter((t) => t.completed).length;
}

function saveTodos() {
  try {
    localStorage.setItem("todos_mod5_demo", JSON.stringify(todos));
  } catch (error) {
    console.error("Gagal menyimpan ke localStorage", error);
  }
}

function loadTodos() {
  try {
    const saved = localStorage.getItem("todos_mod5_demo");
    todos = saved ? JSON.parse(saved) : [];
    renderTodos();
    updateStats();
  } catch (error) {
    console.error("Gagal memuat dari localStorage", error);
    todos = [];
  }
}
