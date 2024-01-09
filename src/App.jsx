import { useState } from 'react';
import "./App.css";
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHome } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

function App() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: "Dar comida dos dogs",
            category: "Casa",
            isCompleted: false,
        },
        {
            id: 2,
            text: "Estudar React",
            category: "Estudo",
            isCompleted: false,
        },
        {
            id: 3,
            text: "Estudar Inglês",
            category: "Estudo",
            isCompleted: false,
        },
    ]);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState("Asc");

    const addTodo = (text, category, date, time, repeat) => {
        const newTodo = {
            id: Math.floor(Math.random() * 10000),
            text,
            category,
            isCompleted: false,
            date,
            time,
            repeat
        };
        setTodos([...todos, newTodo]);
    };

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const completeTodo = (id) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
        });
        setTodos(newTodos);
    };

    const chooseIcon = (category) => {
        switch (category) {
            case "Estudo":
                return <FontAwesomeIcon icon={faBook} />;
            case "Casa":
                return <FontAwesomeIcon icon={faHome} />;
            default:
                return null;
        }
    };

    library.add(faBook, faHome);

    return (
        <div className='app'>
            <h1>Lista de Tarefas</h1>
            <Search search={search} setSearch={setSearch} />
            <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
            <div className='todo-list'>
                {todos
                    .filter(todo =>
                        filter === "All" ? true
                        : filter === "Completed" ? todo.isCompleted
                        : !todo.isCompleted
                    )
                    .filter(todo =>
                        todo.text.toLowerCase().includes(search.toLowerCase())
                )
                    
                    .sort((a, b) => sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)  )

                    .map(todo => (
                        <Todo 
                            key={todo.id} 
                            todo={todo} 
                            icon={chooseIcon(todo.category)} // Passando o ícone como propriedade
                            onRemove={removeTodo} 
                            completeTodo={completeTodo}
                        />
                    ))
                }
            </div>
            <TodoForm addTodo={addTodo} />
        </div>
    );
}

export default App;