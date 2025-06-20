import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Todo = ({ todo, icon, onRemove, completeTodo }) => {
  return (
    <div className={`todo ${todo.isCompleted ? 'completed' : ''}`}>
      <div className='todo-header'>
        <div className='todo-icon'>
          {icon}
        </div>
        <div className='todo-title'>{todo.text}</div>
      </div>
      
      <div className='todo-category'>{todo.category}</div>
      
      <div className='todo-details'>
        {todo.date && (
          <div className='todo-detail'>
            📅 {todo.date}
          </div>
        )}
        {todo.time && (
          <div className='todo-detail'>
            ⏰ {todo.time}
          </div>
        )}
        {todo.repeat && todo.repeat !== 'None' && (
          <div className='todo-detail'>
            🔄 {todo.repeat}
          </div>
        )}
      </div>
      
      <div className='todo-actions'>
        <button className='complete' onClick={() => completeTodo(todo.id)} title="Marcar como completa">
          <FontAwesomeIcon icon="check" />
        </button>
        <button className='remove' onClick={() => onRemove(todo.id)} title="Remover tarefa">
          <FontAwesomeIcon icon="trash" />
        </button>
      </div>
    </div>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    date: PropTypes.string,
    time: PropTypes.string,
    repeat: PropTypes.string
  }).isRequired,
  icon: PropTypes.element,
  onRemove: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
};

export default Todo;