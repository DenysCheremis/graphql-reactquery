function List({ todo, deleteTodo }) {
    return (
        <ul className="grid grid-cols-1 divide-y">
            {todo.map(({ id, title }) => (
                <li key={id} className="p-2 flex justify-between">
                    {id} {title}
                    <button
                        className="rounded-full border-2 border-indigo-500/100 w-8"
                        onClick={() => deleteTodo.mutate(id)}
                    >
                        X
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default List;
