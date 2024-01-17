const url = "https://graphqlzero.almansi.me/api";

const makeQuery = async (query) => {
    return await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    }).then((res) => res.json());
};

async function addTaskHandler(title) {
    const newTaskQuery = `mutation{
        createTodo (input:{title: "${title}", completed: false}){
          title
          id
          completed
        }
      }`;
    const response = await makeQuery(newTaskQuery);
    return response.data.createTodo;
}

async function findTask(title) {
    const searchText = `query{
            todos(options: {search: {q: "${title}"}}){
              data{
                id
                title
              }
            }
          }`;
    const response = await makeQuery(searchText);
    return response.data.todos.data;
}

export { makeQuery, addTaskHandler, findTask };
