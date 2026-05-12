'use client';
import {  useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { deleteTransaction } from "@/app/redux/features/expenseSlice";
import { useDispatch } from "react-redux";
export default function TransactionList(){
  
    const {transactions} = useSelector((state:RootState)=> state.expense);
      const dispatch = useDispatch();
   
    return(
        <div className="mt-8">
            <h3 className="text-lg font-bold border-b-2 border-gray-100 pb-2 mb-4 text-gray-800">
                History
            </h3>
            {transactions.length === 0 && (
        <p className="text-sm text-gray-500">No transactions yet</p>)}
            <ul className="space-y-3">
                {transactions.map((transaction:any)=>(
                    <li key={transaction._id}
                    className='group relative flex justify-between items-center
                     bg-white pl-0 pr-3 py-2 shadow-sm rounded-md 
                    border-r-4 border-gray-200'>
                  
                
                    
                <button onClick={()=> dispatch(deleteTransaction(transaction._id))}
                className=" bg-red-500 text-white px-2 py-1 rounded-l
                hover:bg-red-700 transition-colors mr-3"
                            >x</button>
                    <span className="text-gray-700 font-medium">{transaction.text}</span>
                    <span className={`font-bold ${
                        transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                        {transaction.amount >= 0 ? '+' :''}${transaction.amount}
                    </span>

                    </li>
                ))}
            </ul>

        </div>
    );
}