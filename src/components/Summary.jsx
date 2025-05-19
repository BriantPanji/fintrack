// import { useState } from "react"


export default function Summary({formatRupiah, summary}) {

    const totalBalance = summary.totalIncome - summary.totalExpense;
    
    return (
        <section id="summary" className="bg-white/75 text-ft-primary border-t-2 min-w-full max-w-full min-h-20 rounded-md flex flex-col justify-center items-center px-4 pt-2 pb-4 gap-2 shadow-sm">
            <h1 className="text-2xl font-bold mb-2 text-ft-primary">Summary</h1>
            <div className="w-full flex flex-col items-center lg:flex-row gap-3">
                <div className="w-full flex flex-col bg-white border-l-3 border rounded-md px-2 py-1 border-cyan-800 text-cyan-800">
                    <h6 className="font-medium text-lg">Income Total:</h6>
                    <span className="font-medium">{formatRupiah(summary.totalIncome)}</span>
                </div>
                <div className="w-full flex flex-col bg-white border-l-3 border border-rose-900 text-rose-900 rounded-md px-2 py-1">
                    <h6 className="font-medium text-lg">Expense Total:</h6>
                    <span className="font-medium">{formatRupiah(summary.totalExpense)}</span>
                </div>
                <div className={`w-full flex flex-col bg-white border-l-3 border rounded-md px-2 py-1 ${totalBalance < 0 ? 'text-red-800 border-red-800' : 'text-emerald-700 border-emerald-700'}`}>
                    <h6 className="font-bold text-lg">Balance Total:</h6>
                    <span className={`font-bold `}>{formatRupiah(totalBalance)}</span>
                </div>
            </div>
        </section>
    )
}