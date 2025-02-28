import List from '@mui/material/List';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material'


const getInitialData = () => 
  {
    const data = JSON.parse(localStorage.getItem("todos"))
    if(!data) return [];
    return data;
  }; 
  
// const initialTodos = [
//     {id: 1, text: "walk the dog", completed: true},
//     {id: 3, text: "walk the lizard", completed: false},
//     {id: 4, text: "walk the cat", completed: true},
//     {id: 5, text: "walk the chickens", completed: false},
// ]

export default function TodoList() {
  const [todos, setTodos] = useState(getInitialData);

useEffect(() => {
  localStorage.setItem(
    'todos',
    JSON.stringify(todos)
  )
}, [todos]);

  const removeTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((t) => t.id !== id);
    })
  };

  const toggleTodos = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map(todo => {
        if(todo.id === id) {
          return {...todo, completed: !todo.completed}
        }
        else {
          return todo;
        }
      })
    })
  }

  const addTodo = (text) => {
    setTodos(prevTodos => {
      return [...prevTodos, {text: text, id: crypto.randomUUID(), completed: false }]
    })
  }

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      m: 3,
    }}>
       <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
            Todos
        </Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todos.map((todo) => (
        <TodoItem 
          todo={todo} 
          key={todo.id} 
          remove={removeTodo} 
          toggle={() => toggleTodos(todo.id)}
          
        /> 
      ))}
        <TodoForm addTodo={addTodo}/>
      </List>
    </Box>
  )
}
