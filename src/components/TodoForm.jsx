import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [repeat, setRepeat] = useState("None");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value || !category || !date || !time) return;
        addTodo(value, category, date, time, repeat);
        setValue("");
        setCategory("");
        setDate("");
        setTime("");
        setRepeat("None");
    };

    return (
        <div className='todo-form'>
            <h2>Criar Tarefas</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Digite o Título" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                />
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Selecione uma categoria</option>
                    <option value="Estudo">Estudo</option>
                    <option value="Casa">Casa</option>
                </select>
                <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                />
                <input 
                    type="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                />
                <select 
                    value={repeat} 
                    onChange={(e) => setRepeat(e.target.value)}
                >
                    <option value="None">Não Repetir</option>
                    <option value="Daily">Diariamente</option>
                    <option value="Weekly">Semanalmente</option>
                </select>
                <button type='submit'>Criar tarefa</button>
            </form>
        </div>
    );
}

export default TodoForm;