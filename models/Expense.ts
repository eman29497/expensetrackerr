import mongoose,{Schema,model,models} from "mongoose";
const ExpenseSchema = new Schema ({
    text:{
        type:String,
        required:[true,'Please add some text'],
    },
    amount:{
        type:Number,
        required:[true,'Please add a positive or negative number '],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});
const Expense = models.Expense || model('Expense',ExpenseSchema);
export default Expense;