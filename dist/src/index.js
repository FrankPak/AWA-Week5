"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("./models/User");
const router = (0, express_1.Router)();
let userList = [];
/*
router.post('/addd', (req, res) => {
  let name: string = req.body.name
  let todo: string = req.body.todo
  let index = userList.findIndex((element) => element.name === name) //Maybe problems in the future

  if (index === -1) {
    let newUser : TUser = {
      name: name,
      todos: [todo]
    }
    
    //userList.push(newUser)
    res.send(`Todo added successfully for user ${name}.`)
    return
  }

  userList[index]?.todos.push(todo)

  console.log(userList)


  res.send(`Todo added successfully for user ${name}.`)
})
  */
router.post('/add', async (req, res) => {
    const name = req.body.name;
    const todo = req.body.todo;
    const newTodo = { todo: todo };
    console.log(newTodo);
    try {
        const user = await User_1.User.findOne({ name: name });
        console.log(user);
        if (!user) {
            const user = new User_1.User({
                name: name,
                todos: [newTodo]
            });
            await user.save();
            return res.send(`Todo added successfully for user ${name}.`);
        }
        else {
            user.todos.push(newTodo);
            await user.save();
            return res.send(`Todo added successfully for user ${name}.`);
        }
    }
    catch (error) {
        console.error(`Error while saving user/todo: ${error}`);
        return res.status(500).send("Internal server error");
    }
});
router.get('/todos/:id', async (req, res) => {
    let name = req.params.id;
    let index = userList.findIndex((element) => element.name === name); //Maybe problems in the future
    if (index === -1) {
        res.send("User not found!");
        return;
    }
    res.send(userList[index]?.todos);
});
router.delete('/delete', (req, res) => {
    let name = req.body.name;
    let index = userList.findIndex((element) => element.name === name); //Maybe problems in the future
    if (index === -1) {
        res.send("User not found!");
        return;
    }
    userList.splice(index, 1); //deletes the user from lists
    res.send(`User deleted successfully.`);
});
router.put('/update', (req, res) => {
    let name = req.body.name;
    let todo = req.body.todo;
    let user = userList.find((element) => element.name === name); //this way only the error of possibly undefined for splicing was fixed
    if (!user) {
        res.send("User not found!");
        return;
    }
    let todoIndex = user.todos.indexOf(todo);
    user.todos.splice(todoIndex, 1);
    res.send(`Todo deleted successfully.`);
});
exports.default = router;
//# sourceMappingURL=index.js.map