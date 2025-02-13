import * as React from 'react';
import List from '@mui/material/List';
import TodoItem from './TodoItem';

const initialTodos = [
    {id: 1, text: "walk the dog", completed: true},
    {id: 3, text: "walk the lizard", completed: false},
    {id: 4, text: "walk the cat", completed: true},
    {id: 5, text: "walk the chickens", completed: false},
]

export default function TodoList() {
  const [todos, setTodos] = React.useState(initialTodos);

  const removeTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((t) => t.id !== id);
    })
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} remove={removeTodo}/> 
      ))}
    </List>
  )
}