import { useState, useEffect } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Verifica se o input da task vai estar vazio
    if(!newTaskTitle) return;
    
    // Cria um novo objeto para interface Task
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false, 
    }
    
    // Pega o valor antigo, e pega os valores antigos do array salva e adiciona no final do array um newTask 
    setTasks(oldState => [...oldState, newTask]);
    setNewTaskTitle(''); // Reseta o campo do input

  }

  function handleToggleTaskCompletion(id: number) {
    /*Vai mapear cada task, com o .map e verifica se a task tem o task.id igual ao
    paramentro id, se for igual vai pegar a task antiga e sobescrevendo o isComplete
    propriedade, e se o id for diferente apenas retorna task */
    const checkTasks = tasks.map(task => task.id == id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);
    //Seta o chekTasks no setTasks mudando o array indiretamente
    setTasks(checkTasks);
  }
  function handleRemoveTask(id: number) {
    // filtra as tasks com o .filter
    /*task => pega cada task do filter, filter vai pegar cada task.id e verfica
    se é diferente do paramentro id da function */
    const removeTask = tasks.filter(task => task.id != id);


    //Remove a task usando o setTasks criando um novo estado
    setTasks(removeTask);
  }


  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}