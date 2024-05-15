function getData(){
    fetch("http://localhost:3000/users")
    .then(res=>res.json())
    .then(data=>makeTable(data))
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
        <td><button onclick=updateData(${item.id})>Edit</button><button onclick=deleteData(${item.id})>Delete</button></td>
        </tr>
        `;
    });

    tableBody.innerHTML = innerdata;
}
function addData(Event){
    let id=document.querySelector("#id").value;
    let name=document.querySelector("#name").value;
    let branch=document.querySelector("#branch").value;
    let response = fetch("http://localhost:3000/users",
    {
        method:'POST',
        body:JSON.stringify({
            "id":id,
            "name":name,
            "branch":branch
        })
    })
    if(response.ok){
        Event.preventDefault();
        getData()
    }
    else{
        console.warn("failed to add data",response.statusText)
    }
}
function updateData(id){
    let newname=document.querySelector("#name").value;
    let newbranch=document.querySelector("#branch").value;
    fetch(`http://localhost:3000/users/${id}`,
    {
        method:"PUT",
        body:JSON.stringify({
            "name":newname,
            "branch":newbranch
        })
    })
}
function deleteData(id){
    fetch(`http://localhost:3000/users/${id}`,
    {
        method:"DELETE"
    })
}