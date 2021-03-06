import React, { useState, useRef, useCallback }from 'react';
import TodoTemplate from './components/TodoTemplate'
import TodoInsert from './components/TodoInsert'
import TodoList from './components/TodoList'

// 데이터 대량 생성
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id : i
      , text : `할 일 ${i}`
      , checked : false
    })
  }

  return array;
}

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);

  // 고유값으로 사용할 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4);

  const onInsert = useCallback((text) => {
    const todo = {
      id : nextId.current
      , text
      , checked : false
    };
    // 최적화 위한 수정
    // setTodos(todos.concat(todo));
    setTodos(todos => todos.concat(todo));
    nextId.current += 1;  // 1씩 더하기
  }, /*[todos]*/ [])   // 두번째 파라미터가 빈 배열이 아닐 경우
                // 해당 값이 변경될 경우에만 렌더링

  const onRemove = useCallback((id) => {
    // 최적화 위한 수정
    // setTodos(todos.filter(todo => todo.id !== id))
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }, /*[todos]*/ [])

  const onToggle = useCallback((id) => {
    // 최적화 위한 수정
    // setTodos(todos.map(todo => 
    //   todo.id === id ? {...todo, checked: !todo.checked } : todo
    setTodos(todos => 
      todos.map(todo => 
        todo.id === id ? {...todo, checked: !todo.checked } : todo
    ))
  }, /*[todos]*/ []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}

export default App;