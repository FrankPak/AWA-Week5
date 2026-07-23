"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./src/index"));
const app = (0, express_1.default)();
const port = 3000;
//const __dirname = path.resolve()
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/", index_1.default);
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
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=app.js.map