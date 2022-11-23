import { Button } from "components";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

function App() {
  const [todo, setTodo] = useState({
    title: "",
    desc: "",
    createdAt: "",
  });

  const [todosList, setTodosList] = useState([]);
  const handleCreateTodo = (e) => {
    e.preventDefault();
    setTodosList([
      ...todosList,
      {
        ...todo,
        checked: false,
        disabled: true,
        id: Date.now(),
        createdAt: new Date().toLocaleDateString(),
      },
    ]);
    setTodo({
      title: "",
      desc: "",
      createdAt: "",
    });
  };
  const handleDeleteTodo = (id) => {
    const filtredTodos = todosList.filter((item) => item.id !== id);
    setTodosList(filtredTodos);
  };
  const handleEditTodo = (id) => {
    const todosListCopy = todosList.map((i) => {
      if (i.id === id) {
        return { ...i, disabled: false };
      } else {
        return { ...i, disabled: true };
      }
    });
    setTodosList(todosListCopy);
  };
  const handleCheckTodo = (id) => {
    const todosListCopy = todosList.map((i) => {
      if (i.id === id) {
        return { ...i, checked: true };
      } else {
        return i;
      }
    });
    setTodosList(todosListCopy);
  };
  return (
    <>
      <h1>TODO with React</h1>
      <form>
        <Form.Control
          placeholder="Enter Title"
          value={todo.title}
          onChange={(e) =>
            setTodo({
              ...todo,
              title: e.target.value,
            })
          }
          type="text"
        />
        <br />
        <br />
        <Form.Control
          as="textarea"
          value={todo.desc}
          onChange={(e) =>
            setTodo({
              ...todo,
              desc: e.target.value,
            })
          }
        ></Form.Control>
        <br />
        <Button onClick={handleCreateTodo}>submit</Button>
      </form>

      <ul>
        {todosList.map((item) => (
          <Alert variant={item?.checked ? "success" : "primary"}>
            <h3>
              <Form.Control disabled={item?.disabled} value={item.title} />
            </h3>
            <p>{item.desc}</p>
            <small>{item.createdAt}</small>
            <Button onClick={() => handleDeleteTodo(item.id)}>DEL</Button>
            <Button onClick={() => handleEditTodo(item.id)}>EDIT</Button>
            <Button
              style={{ background: item?.checked ? "yellowgreen" : "#212121" }}
              onClick={() => handleCheckTodo(item.id)}
            >
              CHECK
            </Button>
            <hr />
          </Alert>
        ))}
      </ul>
    </>
  );
}

export default App;
