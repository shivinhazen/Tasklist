import React from 'react';

const Todo = ({ todo, icon, onRemove, completeTodo }) => {
    return (
        <div className='todo' style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}>
            <div className='icon-container'>
                {icon} {/* Exibindo o ícone */}
            </div>
            <div className='content'>
                <p>{todo.text}</p>
                <p className='category'>({todo.category})</p>
                <p>Data: {todo.date}</p>
                <p>Hora: {todo.time}</p>
                <p>Repetir: {todo.repeat}</p>
            </div>
                <button className='complete' onClick={() => completeTodo(todo.id)}>
                    Completar
                </button>
                <button className='remove' onClick={() => onRemove(todo.id)}>
                    <span className='remove-text'>X</span>
                    <i className="fas fa-exclamation-triangle remove-icon"></i>
                </button>
            </div>
    );
}

export default Todo;