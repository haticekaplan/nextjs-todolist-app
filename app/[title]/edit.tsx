import React, { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

type Todo = {
  title: string;
  desc: string;
};

const Edit: React.FC = () => {
  const router = useRouter();
  const { title } = router.query;

  // Initialize state with a Todo object.
  const [todo, setTodo] = useState<Todo>({ title: "", desc: "" });

  const updateTodo = () => {
    // Ensure title from query is a valid string.
    if (typeof title !== "string") {
      alert("Invalid title parameter");
      return;
    }
    const todosStr = localStorage.getItem("todos");
    if (todosStr) {
      const todosJson: Todo[] = JSON.parse(todosStr);
      const filtered = todosJson.filter(value => value.title === title);
      if (filtered.length > 0) {
        const index = todosJson.findIndex(value => value.title === title);
        todosJson[index].title = todo.title;
        todosJson[index].desc = todo.desc;
        localStorage.setItem("todos", JSON.stringify(todosJson));
        alert("Todo has been updated");
      } else {
        alert("Todo does not exist");
      }
    } else {
      localStorage.setItem("todos", JSON.stringify([todo]));
    }
  };

  useEffect(() => {
    // Ensure the router is ready and title is a string before proceeding.
    if (!router.isReady || typeof title !== "string") return;

    const todosStr = localStorage.getItem("todos");
    if (todosStr) {
      const todosJson: Todo[] = JSON.parse(todosStr);
      const ftodo = todosJson.filter(e => e.title === title);
      console.log(ftodo);
      if (ftodo.length > 0) {
        setTodo(ftodo[0]);
      }
    }
  }, [router.isReady, title]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
    console.log(todo);
  };

  return (
    <div>
      <h1>Edit Todo</h1>
      <input
        type="text"
        name="title"
        value={todo.title}
        onChange={onChange}
      />
      <textarea
        name="desc"
        value={todo.desc}
        onChange={onChange}
      ></textarea>
      <button onClick={updateTodo}>Update Todo</button>
    </div>
  );
};

export default Edit;
