import { useState } from "react";
// import { findTask } from "../services/makeQuery";
import makeRactQueryAxios from "../services/makeReactQueryAxios";
import { useQuery } from "react-query";

function SearchTask({ searchTodo }) {
    const [searchValue, setSearchValue] = useState("");

    const handlerSearchValue = (e) => {
        setSearchValue(e.target.value);
    };

    const { data, refetch } = useQuery(["searchTodos", searchValue], () => {
        return makeRactQueryAxios(`query{
                todos(options: {search: {q: "${searchValue}"}}){
               data{
                 id
                 title
               }
             }
            }`);
    });

    const onSearch = async (e) => {
        e.preventDefault();
        await refetch();
        if (data) {
            console.log(data.data.todos.data);
            searchTodo(data.data.todos.data);
        } else {
            console.error("Invalid response structure:", data);
        }
        // const searchedTodo = await findTask(searchValue);
        // console.log(searchedTodo);
        // searchTodo(searchedTodo);
        setSearchValue("");
    };

    return (
        <form onSubmit={onSearch}>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Search"
                    onChange={handlerSearchValue}
                    value={searchValue}
                    className="border-solid border-2 border-sky-500 rounded-lg p-1"
                />
            </div>

            <button
                type="submit"
                className="border-solid border-2 border-sky-500 rounded-lg p-1"
            >
                Search
            </button>
        </form>
    );
}

export default SearchTask;
