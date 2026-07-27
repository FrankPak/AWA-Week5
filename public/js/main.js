function initialize() {
    const submitDataBtn = document.getElementById("submit-data")
    const searcDataBtn = document.getElementById("search")
    const deleteUserBtn = document.getElementById("deleteUser")

    const TODOForm = document.getElementById("todoForm")
    const searchForm = document.getElementById("searchForm")
    const todoList = document.getElementById("todoList")
    
    const resMsg = document.getElementById("msg")
    const resSearchMsg = document.getElementById("searchMsg")
 
    

    submitDataBtn.addEventListener("click", async function () {
        
        const nameData = document.getElementById("userInput").value
        const todoData = document.getElementById("todoInput").value

        console.log(nameData + " front")
        console.log(todoData + " front")
        
        const userData = await fetch("http://localhost:3000/add", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: '{ "name": "' + nameData + '", "todo": "' + todoData + '"  }'
        })
        const response = await userData.text()
        console.log(response)

        resMsg.textContent = response
        TODOForm.reset()


    })
    
    searcDataBtn.addEventListener("click", async function () {
        document.getElementById("todoList").innerHTML = ""
        resSearchMsg.textContent = ""
        deleteUserBtn.setAttribute("hidden","true") //Resets everything if you change names

        const searchData = document.getElementById("searchInput")
        const data = await fetch(`http://localhost:3000/todos/${searchData.value}`)
        const testData = await data.text()
        console.log(testData)

        if (testData == "User not found!") {
        resSearchMsg.textContent = testData
        return
        }


        const todosList = JSON.parse(testData)

        console.log(todosList)
        todosList.forEach(todo => {
            addUserWall(searchData.value, todo.todo, todo.checked)
        })
        
        deleteUserBtn.removeAttribute("hidden")
        
    })

    deleteUserBtn.addEventListener("click", async function () {
        const deleteData = document.getElementById("searchInput")
        const deleteUserData = await fetch("http://localhost:3000/delete", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: '{ "name": "' + deleteData.value + '" }'
        })
        const responseDelete = await deleteUserData.text()
        resSearchMsg.textContent = responseDelete

        document.getElementById("todoList").innerHTML = ""

        deleteUserBtn.setAttribute("hidden","true")
        searchForm.reset()
    })


}


function addUserWall(name,todo, checked) {
    const searchTodoList = document.getElementById("todoList")    
    const listItem = document.createElement("li")
    const label = document.createElement("label")
    const span = document.createElement("span")
    const aEvent = document.createElement("a")
    const checkBox = document.createElement("input")

    checkBox.type = "checkbox"
    checkBox.id = "myCheckbox"
    checkBox.className = "checkBoxes"
    checkBox.checked = checked

    checkBox.addEventListener("change", async function () {

        const responseCheckTodoData = await fetch("http://localhost:3000/updateTodo", {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: '{ "name": "' + name + '", "todo": "' + todo + '", "checked": ' + checkBox.checked + ' }'
        })
    })

    aEvent.className = "delete-task"
    aEvent.href = "#"
    //smarter way probably putting addEventlistener to the whole set to initlaize func and 
    aEvent.addEventListener("click", async function () {
        const responseDelTodoData = await fetch("http://localhost:3000/update", {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: '{ "name": "' + name + '", "todo": "' + todo + '"  }'
        })
        const responseDelTodo = await responseDelTodoData.text()
        //console.log(responseDelTodo)
        const resSearchMsg = document.getElementById("searchMsg")
        resSearchMsg.textContent = responseDelTodo
        updateTodo(name)
    })

    aEvent.append(`${todo}`)

    label.appendChild(checkBox)
    label.appendChild(span)
    label.appendChild(aEvent)
   
    listItem.appendChild(label)
    searchTodoList.appendChild(listItem)
}

async function updateTodo(name) {
    document.getElementById("todoList").innerHTML = ""

    const data = await fetch(`http://localhost:3000/todos/${name}`)
    const testData = await data.text()
    //console.log(testData)

    const todosList = JSON.parse(testData)

    //console.log(todosList)
    todosList.forEach(todo => {
        addUserWall(name, todo.todo, todo.checked)
    })
}


initialize()