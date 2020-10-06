import React, { useReducer, useRef, useCallback }from 'react';
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

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT' :   // 추가
      return todos.concat(action.todo);
    case 'REMOVE' :   // 삭제
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE' : 
      return todos.map(todo =>
        todo.id === action.id ? {...todo, checked : !todo.checked} : todo);
    default :
      return todos;
  }
}

const App = () => {
  // const [todos, setTodos] = useState(createBulkTodos);
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // 고유값으로 사용할 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(2501);

  const onInsert = useCallback((text) => {
    const todo = {
      id : nextId.current
      , text
      , checked : false
    };
    dispatch({type : 'INSERT', todo});
    nextId.current += 1;  // 1씩 더하기
  }, /*[todos]*/ [])   // 두번째 파라미터가 빈 배열이 아닐 경우
                // 해당 값이 변경될 경우에만 렌더링

  const onRemove = useCallback((id) => {
    dispatch({type : 'REMOVE', id});
  }, /*[todos]*/ [])

  const onToggle = useCallback((id) => {
    dispatch({type : 'TOGGLE', id});
  }, /*[todos]*/ []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}

export default App;