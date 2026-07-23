import express, {type Express} from 'express'
import path  from "path"
import router from "./src/index"

const app: Express = express()
const port = 3000
//const __dirname = path.resolve()

app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")))
app.use("/", router)
/*
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hello', (req, res) => {
  res.json({ msg: "Hello world!"})
})

app.get('/echo/:id', (req, res) => {
  let text: string = req.params.id
  res.json({ id: text})
})

//Found help from this to sum an array of numbers for post
//https://coreui.io/answers/how-to-sum-an-array-of-numbers-in-javascript/
app.post('/sum', (req, res) => {
  //console.log(req.body)
  let list: number[] = req.body.numbers
  let sumList = list.reduce((acc, num) => acc + num, 0)
  //console.log(sumList)
  res.json({ sum: sumList})
})
  */

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})