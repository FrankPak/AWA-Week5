import { Request, Response, Router } from "express";
import path  from "path"
import {User,  IUser, ITodo} from "./models/User"
import { console } from "inspector/promises";

const router: Router = Router()



type TUser = {
  name: string,
  todos: string[]
}

let userList: TUser[] = []

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

router.post('/add', async (req: Request, res: Response) => {
  const name: string = req.body.name
  const todo: string = req.body.todo
  const newTodo: ITodo = {todo: todo}
  console.log(newTodo)
  try{
    const user: IUser | null = await User.findOne({name: name})
    console.log(user)
    if (!user) {

      const user: IUser = new User({
        name: name,
        todos: [newTodo]
      })

      await user.save()
      return res.send(`Todo added successfully for user ${name}.`)
    } else {
      user.todos.push(newTodo)
      await user.save()
      return res.send(`Todo added successfully for user ${name}.`)
    }

  } catch (error: any) {
    console.error(`Error while saving user/todo: ${error}`)
    return res.status(500).send("Internal server error")
  }

})




router.get('/todos/:id', async (req: Request<{id: string}>, res: Response) => {
  const username: string = req.params.id
  const user: IUser | null = await User.findOne({name: username})

  if (!user) {
    res.send("User not found!")
    return
  }

  console.log(user.todos)
  res.send(user.todos)
 
})

router.delete('/delete', async (req: Request, res: Response) => {
  let name: string = req.body.name
  let index = userList.findIndex((element) => element.name === name) //Maybe problems in the future
  
  if (index === -1) {
    res.send("User not found!")
    return
  }

  userList.splice(index,1) //deletes the user from lists

  res.send(`User deleted successfully.`)
 
})

router.put('/update', async (req: Request, res: Response) => {
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

export default router