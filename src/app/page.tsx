'use client';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {setTransactions} from '@/app/redux/features/expenseSlice';

import Header from "@/components/Header"
import Balance from "@/components/Balance"
import IncomeExpenseCards from "@/components/IncomeExpenseCards"
import TransactionList from "@/components/TransactionList"
import AddTransaction from "@/components/AddTransaction"
export default function Home(){
  const dispatch = useDispatch();
  useEffect(()=>{
    const loadData = async ()=>{
      try{
        const res = await fetch('/api/expenses');
        const result = await res.json();
        if(result.success){
          dispatch(setTransactions(result.data));
        }
      }catch(error){
        console.log('Error loading:',error);

      }
    };
    loadData();

  },[dispatch]);
  return(
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-sm mx-auto mt-2 md:scale-90 lg:scale-75 origin-top">
        <Header/>
        <div className="bg-white shadow-xl rounded-3xl p-4  w-full">
        
        <Balance/>
        <IncomeExpenseCards/>
        <TransactionList/>
        <AddTransaction/>
            </div>
            </div>
     
    </div>
  )
}