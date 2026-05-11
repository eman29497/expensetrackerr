import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Expense from "../../../../models/Expense";
export async function GET (){
    try{
        await connectDB();
        const expenses = await Expense.find({}).sort({ createdAt : -1});
        return NextResponse.json({success:true,data:expenses});

    }catch(error){
        return NextResponse.json({success:false,error:'Data fetch nhi ho skta'},{status:400});
    }  
}
export async function POST(request:Request){
    try{
        await connectDB();
        const body = await request.json();
        const expense = await Expense.create(body);
        return NextResponse.json({success:true,data:expense},{status:201});
    }catch(error){
        return NextResponse.json({success:false,error:'Data save nhi ho skta'},{status:400});
    }
}
