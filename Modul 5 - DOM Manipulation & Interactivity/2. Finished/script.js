// To-Do List JavaScript
// Demonstrates DOM manipulation, event handling, and local storage

// Global variables
let todos = [];
let currentFilter = "all";
let searchQuery = "";

// DOM elements
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");
const clearCompletedBtn = document.getElementById("clearCompleted");
const clearAllBtn = document.getElementById("clearAll");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const errorMessage = document.getElementById("errorMessage");
const emptyState = document.getElementById("emptyState");
const toast = document.getElementById("toast");

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
  console.log("To-Do List app initialized!");

  // Load todos from localStorage
  loadTodos();

  // Add event listeners
  setupEventListeners();

  // Render initial todos
  renderTodos();

  console.log("App ready!");
});

// Setup event listeners
function setupEventListeners() {
  // Form submission
  todoForm.addEventListener("submit", handleAddTodo);

  // Input validation
  todoInput.addEventListener("input", validateInput);

  // Filter buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => handleFilterChange(btn.dataset.filter));
  });

  // Search functionality
  searchInput.addEventListener("input", handleSearch);

  // Clear buttons
  clearCompletedBtn.addEventListener("click", clearCompleted);
  clearAllBtn.addEventListener("click", clearAll);

  // Keyboard shortcuts
  document.addEventListener("keydown", handleKeyboardShortcuts);
}

// Handle form submission
function handleAddTodo(event) {
  event.preventDefault();

  const text = todoInput.value.trim();

  if (!text) {
    showError("Silakan masukkan tugas!");
    return;
  }

  if (text.length < 3) {
    showError("Tugas harus minimal 3 karakter!");
    return;
  }

  // Check for duplicates
  if (todos.some((todo) => todo.text.toLowerCase() === text.toLowerCase())) {
    showError("Tugas ini sudah ada!");
    return;
  }

  // Create new todo
  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  // Add to todos array
  todos.unshift(newTodo);

  // Save to localStorage
  saveTodos();

  // Clear input
  todoInput.value = "";
  clearError();

  // Render todos
  renderTodos();

  // Show success message
  showToast("Tugas berhasil ditambahkan!", "success");

  console.log("Todo added:", newTodo);
}

// Validate input
function validateInput() {
  const text = todoInput.value.trim();

  if (text.length > 0 && text.length < 3) {
    showError("Tugas harus minimal 3 karakter!");
  } else {
    clearError();
  }
}

// Handle filter change
function handleFilterChange(filter) {
  currentFilter = filter;

  // Update active button
  filterButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });

  // Render todos with new filter
  renderTodos();

  console.log("Filter changed to:", filter);
}

// Handle search
function handleSearch() {
  searchQuery = searchInput.value.toLowerCase();
  renderTodos();
  console.log("Search query:", searchQuery);
}

// Toggle todo completion
function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    todo.completedAt = todo.completed ? new Date().toISOString() : null;

    saveTodos();
    renderTodos();

    const message = todo.completed
      ? "Tugas diselesaikan!"
      : "Tugas dibatalkan!";
    showToast(message, "info");

    console.log("Todo toggled:", todo);
  }
}

// Delete todo
function deleteTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todos = todos.filter((t) => t.id !== id);
    saveTodos();
    renderTodos();
    showToast("Tugas dihapus!", "warning");
    console.log("Todo deleted:", todo);
  }
}

// Edit todo
function editTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    const newText = prompt("Edit tugas:", todo.text);
    if (newText && newText.trim() !== todo.text) {
      if (newText.trim().length < 3) {
        showToast("Tugas harus minimal 3 karakter!", "error");
        return;
      }

      if (
        todos.some(
          (t) =>
            t.id !== id && t.text.toLowerCase() === newText.trim().toLowerCase()
        )
      ) {
        showToast("Tugas ini sudah ada!", "error");
        return;
      }

      todo.text = newText.trim();
      todo.updatedAt = new Date().toISOString();
      saveTodos();
      renderTodos();
      showToast("Tugas diperbarui!", "success");
      console.log("Todo edited:", todo);
    }
  }
}

// Clear completed todos
function clearCompleted() {
  const completedTodos = todos.filter((t) => t.completed);
  if (completedTodos.length === 0) {
    showToast("Tidak ada tugas yang selesai!", "info");
    return;
  }

  if (confirm(`Hapus ${completedTodos.length} tugas yang selesai?`)) {
    todos = todos.filter((t) => !t.completed);
    saveTodos();
    renderTodos();
    showToast(`${completedTodos.length} tugas dihapus!`, "success");
    console.log("Completed todos cleared:", completedTodos.length);
  }
}

// Clear all todos
function clearAll() {
  if (todos.length === 0) {
    showToast("Tidak ada tugas untuk dihapus!", "info");
    return;
  }

  if (confirm(`Hapus semua ${todos.length} tugas?`)) {
    todos = [];
    saveTodos();
    renderTodos();
    showToast("Semua tugas dihapus!", "success");
    console.log("All todos cleared");
  }
}

// Render todos
function renderTodos() {
  // Filter todos based on current filter and search
  let filteredTodos = todos;

  // Apply filter
  switch (currentFilter) {
    case "active":
      filteredTodos = filteredTodos.filter((t) => !t.completed);
      break;
    case "completed":
      filteredTodos = filteredTodos.filter((t) => t.completed);
      break;
  }

  // Apply search
  if (searchQuery) {
    filteredTodos = filteredTodos.filter((t) =>
      t.text.toLowerCase().includes(searchQuery)
    );
  }

  // Clear todo list
  todoList.innerHTML = "";

  // Show empty state if no todos
  if (filteredTodos.length === 0) {
    emptyState.classList.remove("hidden");
    if (todos.length === 0) {
      emptyState.innerHTML = `
                <i class="fas fa-clipboard-list"></i>
                <h3>Tidak ada tugas</h3>
                <p>Tambahkan tugas pertama Anda untuk memulai</p>
            `;
    } else if (searchQuery) {
      emptyState.innerHTML = `
                <i class="fas fa-search"></i>
                <h3>Tidak ada hasil</h3>
                <p>Tidak ada tugas yang cocok dengan pencarian "${searchQuery}"</p>
            `;
    } else {
      emptyState.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Tidak ada tugas ${
                  currentFilter === "active" ? "aktif" : "selesai"
                }</h3>
                <p>Semua tugas sudah ${
                  currentFilter === "active" ? "selesai" : "aktif"
                }</p>
            `;
    }
  } else {
    emptyState.classList.add("hidden");

    // Render todos
    filteredTodos.forEach((todo) => {
      const todoElement = createTodoElement(todo);
      todoList.appendChild(todoElement);
    });
  }

  // Update stats
  updateStats();

  console.log("Todos rendered:", filteredTodos.length);
}

// Create todo element
function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className = `todo-item ${todo.completed ? "completed" : ""}`;
  li.dataset.id = todo.id;

  li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${
          todo.completed ? "checked" : ""
        }>
        <span class="todo-text">${escapeHtml(todo.text)}</span>
        <div class="todo-actions">
            <button class="edit-btn" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn" title="Hapus">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

  // Add event listeners
  const checkbox = li.querySelector(".todo-checkbox");
  const editBtn = li.querySelector(".edit-btn");
  const deleteBtn = li.querySelector(".delete-btn");

  checkbox.addEventListener("change", () => toggleTodo(todo.id));
  editBtn.addEventListener("click", () => editTodo(todo.id));
  deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

  return li;
}

// Update statistics
function updateStats() {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((t) => t.completed).length;
  const activeTodos = totalTodos - completedTodos;

  taskCount.textContent = `${activeTodos} tugas aktif`;
  completedCount.textContent = `${completedTodos} selesai`;

  // Update clear button states
  clearCompletedBtn.disabled = completedTodos === 0;
  clearAllBtn.disabled = totalTodos === 0;
}

// Show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  todoInput.focus();
}

// Clear error message
function clearError() {
  errorMessage.classList.add("hidden");
}

// Show toast notification
function showToast(message, type = "info") {
  const toastContent = toast.querySelector(".toast-content");
  const toastIcon = toast.querySelector(".toast-icon");
  const toastMessage = toast.querySelector(".toast-message");

  // Set icon based on type
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  };

  toastIcon.className = `toast-icon ${icons[type] || icons.info}`;
  toastMessage.textContent = message;

  // Set toast class
  toast.className = `toast ${type}`;
  toast.classList.remove("hidden");

  // Auto hide after 3 seconds
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);

  console.log("Toast shown:", message, type);
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(event) {
  // Ctrl/Cmd + Enter to add todo
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    if (document.activeElement === todoInput) {
      handleAddTodo(event);
    }
  }

  // Escape to clear search
  if (event.key === "Escape") {
    searchInput.value = "";
    searchQuery = "";
    renderTodos();
  }

  // Ctrl/Cmd + K to focus search
  if ((event.ctrlKey || event.metaKey) && event.key === "k") {
    event.preventDefault();
    searchInput.focus();
  }
}

// Local storage functions
function saveTodos() {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("Todos saved to localStorage");
  } catch (error) {
    console.error("Error saving todos:", error);
    showToast("Gagal menyimpan data!", "error");
  }
}

function loadTodos() {
  try {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      todos = JSON.parse(savedTodos);
      console.log("Todos loaded from localStorage:", todos.length);
    }
  } catch (error) {
    console.error("Error loading todos:", error);
    showToast("Gagal memuat data!", "error");
    todos = [];
  }
}

// Utility functions
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Export functions for testing (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    addTodo: handleAddTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    clearAll,
    saveTodos,
    loadTodos,
  };
}
