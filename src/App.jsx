import List from "./components/List";
import AddTask from "./components/AddTask";
import SearchTask from "./components/SearchTask";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { doubleTodos } from "./slices/listSlice";
// import { makeQuery } from "./makeQuery";
// import makeRactQuery from "./services/makeReactQuery";
import makeRactQueryAxios from "./services/makeReactQueryAxios";

import "./App.css";

function App() {
    const [todo, setTodo] = useState([]);

    const alTodos = useSelector((state) => state.listSlice.allTodos);

    const dispatch = useDispatch();

    // const { data, isLoading, isError } = useQuery("todos", () =>
    //     makeRactQuery(`query{
    //     todos{
    //       data{
    //         id
    //         title
    //       }
    //     }
    //   }`)
    // );

    const { data, isLoading, isError } = useQuery("todos", () =>
        makeRactQueryAxios(`query{
            todos{
              data{
                id
                title
              }
            }
          }`)
    );

    if (isLoading) {
        console.log("LOADING");
    }
    if (isError) {
        console.error(isError.message);
    }

    useEffect(() => {
        if (data) {
            setTodo(data.data.todos.data);
        }
    }, [data]);

    const deleteTodo = useMutation(
        (id) =>
            makeRactQueryAxios(`mutation{
        deleteTodo(id: "${id}")
      }`),
        {
            onSuccess: (data, id) => {
                if (data.data.deleteTodo) {
                    setTodo(todo.filter((item) => item.id !== id));
                }
            },
            onError: (error) => console.error(error),
        }
    );

    // const deleteTodo = async (id) => {
    //     const response = await makeRactQuery(`mutation{
    //         deleteTodo(id: "${id}")
    //       }`);
    //     if (response.data.deleteTodo) {
    //         setTodo(todo.filter((item) => item.id !== id));
    //     } else {
    //         console.error("error");
    //     }
    // };

    // useEffect(() => {
    //     makeQuery(`query{
    //         todos{
    //           data{
    //             id
    //             title
    //           }
    //         }
    //       }`).then(({ data }) => setTodo(data.todos.data));
    // }, []);

    const addTodo = (addedTodo) => {
        setTodo([...todo, addedTodo]);
    };

    const searchTodo = (searchedTodo) => {
        setTodo([...searchedTodo]);
    };

    const handleDoubleTodos = () => {
        dispatch(doubleTodos());
        console.log(alTodos);
    };

    return (
        <div className="containerr">
            <h1 className="py-5 text-7xl">GRAPHQL</h1>
            <AddTask addTodo={addTodo} />
            <SearchTask searchTodo={searchTodo} />
            <button onClick={handleDoubleTodos}>X2</button>
            <List todo={todo} deleteTodo={deleteTodo} />
        </div>
    );
}

export default App;
