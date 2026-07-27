"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("./models/User");
const promises_1 = require("inspector/promises");
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
    const newTodo = { todo: todo, checked: false };
    promises_1.console.log(newTodo);
    try {
        const user = await User_1.User.findOne({ name: name });
        promises_1.console.log(user);
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
        promises_1.console.error(`Error while saving user/todo: ${error}`);
        return res.status(500).send("Internal server error");
    }
});
router.get('/todos/:id', async (req, res) => {
    const username = req.params.id;
    const user = await User_1.User.findOne({ name: username });
    if (!user) {
        res.send("User not found!");
        return;
    }
    promises_1.console.log(user.todos);
    res.send(user.todos);
});
router.put('/update', async (req, res) => {
    let username = req.body.name;
    let todo = req.body.todo;
    const user = await User_1.User.findOne({ name: username });
    if (!user) {
        res.send("User not found!");
        return;
    }
    let todoIndex = user.todos.findIndex((element) => element.todo === todo);
    user.todos.splice(todoIndex, 1);
    await user.save();
    res.send(`Todo deleted successfully.`);
});
router.put('/updateTodo', async (req, res) => {
    let username = req.body.name;
    let todo = req.body.todo;
    let checked = req.body.checked;
    const user = await User_1.User.findOne({ name: username });
    if (!user) {
        res.send("User not found!");
        return;
    }
    else {
        let todoIndex = user.todos.findIndex((element) => element.todo === todo);
        user.todos[todoIndex].checked = checked;
        await user.save();
        res.send(`Todo checked successfully.`);
    }
});
exports.default = router;
//# sourceMappingURL=index.js.map