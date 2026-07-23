"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
fs_1.default.readFile('data.json', (err, data) => {
    if (err) {
        fs_1.default.writeFileSync('data.json', "");
    }
});
let userList = [];
router.post('/add', (req, res) => {
    let name = req.body.name;
    let todo = req.body.todo;
    let index = userList.findIndex((element) => element.name === name); //Maybe problems in the future
    if (index === -1) {
        let newUser = {
            name: name,
            todos: [todo]
        };
        userList.push(newUser);
        res.send(`Todo added successfully for user ${name}.`);
        return;
    }
    userList[index]?.todos.push(todo);
    console.log(userList);
    res.send(`Todo added successfully for user ${name}.`);
});
router.get('/todos/:id', (req, res) => {
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
/*
router.post('/users', (req, res) => {
  //console.log(req.body.email)
  
  let userName: string = req.body.name
  let userEmail: string = req.body.email

  let newUser: TUser = {
    name: userName,
    todos: string[]
  }

  userList.push(newUser)
  //console.log(userList)
  
  res.send("User successfully added")
})

router.get('/users', (req, res) => {
  res.status(201).json({users: userList})
})
*/
exports.default = router;
//# sourceMappingURL=index.js.map