'use client';
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

export default function Balance(){

    const {transactions} = useSelector((state:RootState)=> state.expense);
    const totalBalance = transactions.map(t => t.amount)
    .reduce((acc,item) => (acc += item) ,0)
    .toFixed(2);
    return(
        <div className="mb-2 text-center">
            <h3 className=" uppercase text-gray-600 font-semibold p-6 text-sm">Your Balance</h3>
            <h1 className="text-2xl font-bold text-gray-900 ">${totalBalance}</h1>
        </div>
    )
}