import { Request, Response, Router } from "express";
import path  from "path"
import fs from "fs"

const router: Router = Router()

fs.readFile('data.json', (err, data) => {
  if (err){
    fs.writeFileSync('data.json', "")
  }
})

type TUser = {
  name: string,
  todos: string[]
}

let userList: TUser[] = []


router.post('/add', (req, res) => {
  let name: string = req.body.name
  let todo: string = req.body.todo
  let index = userList.findIndex((element) => element.name === name) //Maybe problems in the future

  if (index === -1) {
    let newUser : TUser = {
      name: name,
      todos: [todo]
    }
    
    userList.push(newUser)
    res.send(`Todo added successfully for user ${name}.`)
    return
  }

  userList[index]?.todos.push(todo)

  console.log(userList)


  res.send(`Todo added successfully for user ${name}.`)
})

router.get('/todos/:id', (req, res) => {
  let name: string = req.params.id
  let index = userList.findIndex((element) => element.name === name) //Maybe problems in the future

  if (index === -1) {
    res.send("User not found!")
    return
  }

  res.send(userList[index]?.todos)
 
})

router.delete('/delete', (req, res) => {
  let name: string = req.body.name
  let index = userList.findIndex((element) => element.name === name) //Maybe problems in the future
  
  if (index === -1) {
    res.send("User not found!")
    return
  }

  userList.splice(index,1) //deletes the user from lists

  res.send(`User deleted successfully.`)
 
})

router.put('/update', (req, res) => {
  let name: string = req.body.name
  let todo: string = req.body.todo
  let user = userList.find((element) => element.name === name) //this way only the error of possibly undefined for splicing was fixed
  if (!user) {
    res.send("User not found!")
    return
  }

  let todoIndex = user.todos.indexOf(todo) 
  
  user.todos.splice(todoIndex,1) 

  res.send(`Todo deleted successfully.`)
 
})
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
export default router