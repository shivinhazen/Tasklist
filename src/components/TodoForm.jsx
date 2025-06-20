import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [repeat, setRepeat] = useState("None");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!value.trim()) {
      newErrors.text = "Título é obrigatório";
    }
    if (!category) {
      newErrors.category = "Categoria é obrigatória";
    }
    if (!date) {
      newErrors.date = "Data é obrigatória";
    }
    if (!time) {
      newErrors.time = "Hora é obrigatória";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simular delay para mostrar loading
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addTodo(value, category, date, time, repeat);
    
    // Reset form
    setValue("");
    setCategory("");
    setDate("");
    setTime("");
    setRepeat("None");
    setErrors({});
    setIsLoading(false);
  };

  const handleInputChange = (field, value) => {
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
    
    switch (field) {
      case 'text':
        setValue(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'date':
        setDate(value);
        break;
      case 'time':
        setTime(value);
        break;
      case 'repeat':
        setRepeat(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className='todo-form'>
      <h2>Criar Nova Tarefa</h2>
      <form onSubmit={handleSubmit} className={isLoading ? 'loading' : ''}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Digite o título da tarefa..." 
            value={value} 
            onChange={(e) => handleInputChange('text', e.target.value)}
            className={errors.text ? 'error' : ''}
            disabled={isLoading}
          />
          {errors.text && <span className="error-message">{errors.text}</span>}
        </div>
        
        <div className="form-group">
          <select 
            value={category} 
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={errors.category ? 'error' : ''}
            disabled={isLoading}
          >
            <option value="">Selecione uma categoria</option>
            <option value="Estudo">📚 Estudo</option>
            <option value="Casa">🏠 Casa</option>
            <option value="Trabalho">💼 Trabalho</option>
            <option value="Saúde">🏥 Saúde</option>
            <option value="Lazer">🎮 Lazer</option>
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>
        
        <div className="form-group">
          <input 
            type="date" 
            value={date} 
            onChange={(e) => handleInputChange('date', e.target.value)}
            className={errors.date ? 'error' : ''}
            disabled={isLoading}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>
        
        <div className="form-group">
          <input 
            type="time" 
            value={time} 
            onChange={(e) => handleInputChange('time', e.target.value)}
            className={errors.time ? 'error' : ''}
            disabled={isLoading}
          />
          {errors.time && <span className="error-message">{errors.time}</span>}
        </div>
        
        <div className="form-group">
          <select 
            value={repeat} 
            onChange={(e) => handleInputChange('repeat', e.target.value)}
            disabled={isLoading}
          >
            <option value="None">Não repetir</option>
            <option value="Daily">Diariamente</option>
            <option value="Weekly">Semanalmente</option>
            <option value="Monthly">Mensalmente</option>
          </select>
        </div>
        
        <button type='submit' disabled={isLoading} title="Adicionar tarefa">
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <FontAwesomeIcon icon="plus" />
          )}
        </button>
      </form>
    </div>
  );
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default TodoForm;
