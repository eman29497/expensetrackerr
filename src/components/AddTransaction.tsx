'use client';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "@/app/redux/features/expenseSlice";
export default function AddTransaction() {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const showLocalNotification = (title: string, amount: number, isOffline = false) => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        const options = {
          body: `${title} add ho gya Amount: ${amount}${isOffline ? ' (Saved Offline)' : ''}`,
          icon: '/icon-192x192.png',
          badge: '/icon-192x192.png',
          tag: 'expense-notification',
        };
        registration.showNotification(isOffline ? 'Offline Entry!' : 'Expense Added!', options);
      });
    }
  };
  useEffect(() => {
    const handleOnline = async () => {
      console.log("Internet is back! Syncing data...");
      const offlineEntries = JSON.parse(localStorage.getItem('offline-transactions') || '[]');
      if (offlineEntries.length > 0) {
        for (const entry of offlineEntries) {
          try {
            await fetch('/api/expenses', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text: entry.text, amount: entry.amount }),
            });
          } catch (err) {
            console.error("Sync failed for:", entry.text);
          }
        }
        localStorage.removeItem('offline-transactions');
        alert("All offline transactions synced with MongoDB!");
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !amount) return;
    const transactionData = {
      text: text,
      amount: Number(amount)
    };
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });

      const result = await response.json();

      if (result.success) {
        dispatch(addTransaction(result.data));
        showLocalNotification(result.data.text, result.data.amount);
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      console.log('Network failed, saving locally...');

      const offlineEntry = { 
        ...transactionData, 
        id: Date.now(), 
        status: 'pending' 
      };
      dispatch(addTransaction(offlineEntry));

      const existing = JSON.parse(localStorage.getItem('offline-transactions') || '[]');
      existing.push(offlineEntry);
      localStorage.setItem('offline-transactions', JSON.stringify(existing));
      showLocalNotification(text, Number(amount), true);
    }

    setText('');
    setAmount('');
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
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Text
                    </label>
                    <input
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                    type="text"
                    placeholder="Enter description..."
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 text-sm"
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
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 text-sm"
                />
                </div>  
                <button className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 transform hover:scale-[1.02] active:scale-95 uppercase tracking-wide">
                    Add Transaction
                    </button> 

            </form>
            
        

        </div>
    )
}