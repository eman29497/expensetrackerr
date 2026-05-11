
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface Transaction{
    _id?:string;
    text:string;
    amount:number;
}
interface ExpenseState{
    transactions: Transaction[];
}
const initialState : ExpenseState = {
    transactions:[],
};
const expenseSlice = createSlice({
    name:'expense',
    initialState,
    reducers:{

          setTransactions:(state,action:PayloadAction<Transaction[]>)=>{
            state.transactions=(action.payload);
        

        },

        addTransaction:(state,action:PayloadAction<Transaction>)=>{
            state.transactions.unshift(action.payload);
        

        },
        deleteTransaction : (state,action:PayloadAction<string>)=>{
            state.transactions = state.transactions.filter(t => t._id !== action.payload);
    
        },
    },
});
export const {addTransaction,deleteTransaction,setTransactions} = expenseSlice.actions;
export default expenseSlice.reducer;
