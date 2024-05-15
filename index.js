async function getData(){
    try {
        const response = await axios.get("http://localhost:3000/users");
        console.log(response)
        makeTable(response.data);
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}

function makeTable(data){
    let tableBody = document.querySelector("#userdata");
    let innerdata='';
    data.forEach(item => {
        innerdata += `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.branch}</td>
        <td><button onclick="updateData(${item.id})">Edit</button><button onclick="deleteData(${item.id})">Delete</button></td>
        </tr>
        `;
    });

    tableBody.innerHTML = innerdata;
}

async function addData(){
    let id = document.querySelector("#id").value;
    let name = document.querySelector("#name").value;
    let branch = document.querySelector("#branch").value;
    try {
        const response = await axios.post("http://localhost:3000/users", {
            "id": id,
            "name": name,
            "branch": branch
        });
        getData();
    } catch (error) {
        console.error("Failed to add data:", error);
    }
}

async function updateData(id){
    let newname = document.querySelector("#name").value;
    let newbranch = document.querySelector("#branch").value;
    try {
        await axios.put(`http://localhost:3000/users/${id}`, {
            "name": newname,
            "branch": newbranch
        });
        getData();
    } catch (error) {
        console.error("Failed to update data:", error);
    }
}

async function deleteData(id){
    try {
        await axios.delete(`http://localhost:3000/users/${id}`);
        getData();
    } catch (error) {
        console.error("Failed to delete data:", error);
    }
}
