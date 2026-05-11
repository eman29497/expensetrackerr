'use client';
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
export default function IncomeExpenseCards(){
    const {transactions} = useSelector((state:RootState)=> state.expense);
    const amounts = transactions.map((t)=> t.amount);
    const income = amounts.filter((item)=> item > 0)
    .reduce((acc,item) => (acc +item), 0)
    .toFixed(2);
    const expense = (
        amounts.filter((item) => item < 0).reduce ((acc,item) => (acc += item),0 ) * -1

    ).toFixed(2);
    return(
      <div className="flex gap-4 justify-between items-stretch">
        <div className="flex-1 bg-white p-4 rounded-xl border-r-2 border-green-500 shadow-sm text-center">
            <h4 className="text-xs font-bold uppercase text-gray-600 mb-1">Income</h4>
            <p className="text-xl font-bold text-green-600">+${income}</p>
        </div>
        <div className="flex-1 bg-white p-4 rounded-xl border-r-2 border-red-500 shadow-sm text-center">
            <h4 className="text-xs font-bold uppercase text-gray-600 mb-1">Expense</h4>
            <p className="text-xl font-bold text-red-600">-${expense}</p>
        </div>
    
        
        </div>
    
    )
}