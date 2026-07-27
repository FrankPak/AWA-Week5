import mongoose, { Document } from "mongoose";
interface ITodo {
    todo: string;
}
interface IUser extends Document {
    name: string;
    todos: ITodo[];
}
declare const User: mongoose.Model<IUser>;
export { User, type IUser, type ITodo };
//# sourceMappingURL=User.d.ts.map