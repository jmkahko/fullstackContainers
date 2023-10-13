const Todo = ({ todo, deleteTodo, completeTodo}) => {

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }} className='todo'>
      <span>
        {todo.text} 
      </span>
      {todo.done ? deleteTodo : completeTodo}
    </div>
  )
}

export default Todo