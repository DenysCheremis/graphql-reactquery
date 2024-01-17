async function makeRactQuery(query) {
    const response = await fetch("https://graphqlzero.almansi.me/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    });
    return response.json();
}

export default makeRactQuery;
