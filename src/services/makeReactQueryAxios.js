import axios from "axios";

async function makeRactQueryAxios(query) {
    const response = await axios.post("https://graphqlzero.almansi.me/api", {
        query,
    });
    return response.data;
}

export default makeRactQueryAxios;
