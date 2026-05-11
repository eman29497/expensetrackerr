'use client';
import { useState } from "react";
import { useDispatch } from "react-redux";
import  {addTransaction}  from "@/app/redux/features/expenseSlice";

export default function AddTransaction(){
    const [text,setText] = useState('');
    const [amount,setAmount] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = async(e : React.FormEvent) =>{
        e.preventDefault();
        const transactionData = {
            text:text,
            amount:Number(amount)
        };
        try{
            const response = await fetch('/api/expenses',{
                method:'POST',
                headers:{
                    'Content-Type': 'appliction/json',
                },
                body:JSON.stringify(transactionData),
            });
            const result = await response.json();
          
            if(result.success){
  dispatch(addTransaction(result.data));
   setText('');
        setAmount('');
        console.log('Data saved to MongoDB!');
            }else{
                alert('Saving failed:'+result.error);
            }
         }catch(error){
            console.log('Error:',error);
         }
        };
    return(
        <div className="mt-10">
            <h3 className="text-lg font-bold border-b-2 border-gray-100 pb-2 mb-6 text-gray-800">
                Add New Transaction
            </h3>
            <form
            onSubmit={handleSubmit}
             className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Text
                    </label>
                    <input
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                    type="text"
                    placeholder="Enter description..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 text-sm"
                    />
                </div>
             <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Amount
                </label>
                <span className="text-xs text-gray-500 mb-2 block">
                    (negative - expense, positive + income)
                </span>
                <input
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                type="number"
                placeholder="0.00"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 text-sm"
                />
                </div>  
                <button className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 transform hover:scale-[1.02] active:scale-95 uppercase tracking-wide">
                    Add Transaction
                    </button> 

            </form>
            
        

        </div>
    )
}