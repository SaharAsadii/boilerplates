import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_TASKS = gql`
  query {
    getTasks {
      id
      completed
      title
    }
  }
`;

const ADD_TASK = gql`
  mutation addTask($title: String!) {
    addTask(title: $title) {
      id
      title
      completed
    }
  }
`;

const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

const COMPLETE_TASK = gql`
  mutation completeTask($id: ID!) {
    completeTask(id: $id) {
      id
      completed
    }
  }
`;

function Task() {
  const [title, setTitle] = useState("");
  const { data, loading, error, refetch } = useQuery(GET_TASKS);
  const [addTask] = useMutation(ADD_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);
  const [completeTask] = useMutation(COMPLETE_TASK);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>{error.message}</p>;
  console.log({ data });

  const handleAddTask = async () => {
    await addTask({ variables: { title } });
    refetch();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask({ variables: { id } });
    refetch();
  };

  const handleCompleteTask = async (id: string) => {
    await completeTask({ variables: { id } });
    refetch();
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        <button onClick={handleAddTask}>Add Task</button>
        <ul>
          {data.getTasks.map(
            (task: { id: string; title: string; completed: boolean }) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCompleteTask(task.id)}
                />
                <span style={{ color: "white" }}>{task.title}</span>
                <button onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
              </li>
            )
          )}
        </ul>
      </div>
      <button>
        <a href="/login" target="_blank">
          Login
        </a>
      </button>
    </>
  );
}

export default Task;
