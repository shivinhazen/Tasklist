import { useState, useMemo, useEffect } from 'react';
import "./App.css";
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';
import Toast from './components/Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, 
  faHome, 
  faArrowUp, 
  faArrowDown, 
  faCheck, 
  faPlus, 
  faTrash,
  faBriefcase,
  faHeartbeat,
  faGamepad,
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

// Registra ícones apenas uma vez no módulo
library.add(
  faBook, faHome, faArrowUp, faArrowDown, faCheck, faPlus, faTrash, 
  faBriefcase, faHeartbeat, faGamepad, faCheckCircle, faExclamationCircle, 
  faExclamationTriangle, faInfoCircle, faTimes
);

// Função para carregar dados do localStorage
const loadTodosFromStorage = () => {
  try {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [
      {
        id: 1,
        text: "Dar comida dos dogs",
        category: "Casa",
        isCompleted: false,
        date: "2024-01-15",
        time: "18:00",
        repeat: "Daily"
      },
      {
        id: 2,
        text: "Estudar React",
        category: "Estudo",
        isCompleted: false,
        date: "2024-01-16",
        time: "14:00",
        repeat: "Weekly"
      },
      {
        id: 3,
        text: "Estudar Inglês",
        category: "Estudo",
        isCompleted: false,
        date: "2024-01-17",
        time: "10:00",
        repeat: "None"
      },
    ];
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    return [];
  }
};

// Função para salvar dados no localStorage
const saveTodosToStorage = (todos) => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
};

function App() {
  const [todos, setTodos] = useState(loadTodosFromStorage);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");
  const [toasts, setToasts] = useState([]);

  // Salvar dados sempre que todos mudar
  useEffect(() => {
    saveTodosToStorage(todos);
  }, [todos]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Lista filtrada e ordenada memoizada
  const visibleTodos = useMemo(() => {
    return todos
      .filter(todo =>
        filter === "All"
          ? true
          : filter === "Completed"
          ? todo.isCompleted
          : !todo.isCompleted
      )
      .filter(todo =>
        todo.text.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) =>
        sort === "Asc"
          ? a.text.localeCompare(b.text)
          : b.text.localeCompare(a.text)
      );
  }, [todos, filter, search, sort]);

  const addTodo = (text, category, date, time, repeat) => {
    const newTodo = {
      id: Date.now(),
      text,
      category,
      isCompleted: false,
      date,
      time,
      repeat,
    };
    setTodos(prev => [...prev, newTodo]);
    showToast(`Tarefa "${text}" adicionada com sucesso!`, 'success');
  };

  const removeTodo = id => {
    const todo = todos.find(t => t.id === id);
    setTodos(prev => prev.filter(todo => todo.id !== id));
    showToast(`Tarefa "${todo.text}" removida`, 'info');
  };

  const completeTodo = id => {
    const todo = todos.find(t => t.id === id);
    const newStatus = !todo.isCompleted;
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, isCompleted: newStatus }
          : todo
      )
    );
    showToast(
      newStatus 
        ? `Tarefa "${todo.text}" marcada como completa!` 
        : `Tarefa "${todo.text}" marcada como pendente`,
      newStatus ? 'success' : 'info'
    );
  };

  const chooseIcon = category => {
    switch (category) {
      case "Estudo":
        return <FontAwesomeIcon icon={faBook} />;
      case "Casa":
        return <FontAwesomeIcon icon={faHome} />;
      case "Trabalho":
        return <FontAwesomeIcon icon={faBriefcase} />;
      case "Saúde":
        return <FontAwesomeIcon icon={faHeartbeat} />;
      case "Lazer":
        return <FontAwesomeIcon icon={faGamepad} />;
      default:
        return null;
    }
  };

  return (
    <div className='app'>
      <h1>Lista de Tarefas</h1>
      <div className="controls">
        <Search search={search} setSearch={setSearch} />
        <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      </div>

      <div className='todo-list'>
        {visibleTodos.length > 0 ? (
          visibleTodos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              icon={chooseIcon(todo.category)}
              onRemove={removeTodo}
              completeTodo={completeTodo}
            />
          ))
        ) : (
          <div className="empty-state">
            <h3>Nenhuma tarefa encontrada</h3>
            <p>Adicione uma nova tarefa usando o formulário abaixo</p>
          </div>
        )}
      </div>

      <TodoForm addTodo={addTodo} />

      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
