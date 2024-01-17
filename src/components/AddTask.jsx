// import { addTaskHandler } from "./makeQuery";
import { useState } from "react";
import { useMutation } from "react-query";

// import makeRactQuery from "../services/makeReactQuery";
import makeRactQueryAxios from "../services/makeReactQueryAxios";

function AddTask({ addTodo }) {
    const [inputValue, setInputValue] = useState("");

    // const mutation = useMutation(
    //     () => {
    //         return makeRactQuery(`mutation{
    //         createTodo (input:{title: "${inputValue}", completed: false}){
    //           title
    //           id
    //           completed
    //         }
    //       }`);
    //     },
    //     {
    //         onSuccess: (data) => {
    //             console.log(data.data.createTodo);
    //             addTodo(data.data.createTodo);
    //         },
    //     }
    // );

    const mutation = useMutation(
        () => {
            return makeRactQueryAxios(`mutation{
            createTodo (input:{title: "${inputValue}", completed: false}){
              title
              id
              completed
            }
          }`);
        },
        {
            onSuccess: (data) => {
                console.log(data.data.createTodo);
                addTodo(data.data.createTodo);
            },
        }
    );

    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    };

    // const pushNewTask = async (e) => {
    //     e.preventDefault();
    //     const newToDo = await addTaskHandler(inputValue);
    //     addTodo(newToDo);
    //     setInputValue("");
    // };

    const onSubmit = (e) => {
        e.preventDefault();
        mutation.mutate();
        setInputValue("");
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Add"
                    onChange={handleInputValue}
                    value={inputValue}
                    className="border-solid border-2 border-sky-500 rounded-lg p-1"
                />
            </div>

            <button
                type="submit"
                className="border-solid border-2 border-sky-500 rounded-lg p-1 "
            >
                Add
            </button>
        </form>
    );
}

export default AddTask;
