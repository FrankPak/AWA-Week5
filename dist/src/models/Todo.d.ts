import { Schema, type Document } from "mongoose";
export interface ITodo extends Document {
    todo: string;
}
export declare const todoSchema: Schema<ITodo, import("mongoose").Model<ITodo, any, any, any, any, any, ITodo>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ITodo, Document<unknown, {}, ITodo, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ITodo & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, ITodo, Document<unknown, {}, ITodo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ITodo & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    todo?: import("mongoose").SchemaDefinitionProperty<string, ITodo, Document<unknown, {}, ITodo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ITodo & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
}, ITodo>;
declare const Todo: import("mongoose").Model<ITodo, {}, {}, {}, Document<unknown, {}, ITodo, {}, import("mongoose").DefaultSchemaOptions> & ITodo & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITodo>;
export default Todo;
//# sourceMappingURL=Todo.d.ts.map