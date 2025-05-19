
import { useState } from "react"


export default function Income({ saveIncome }) {
    
    const [incomeData, setIncomeData] = useState({
        income: 0,
        date: '0',
        description: "",
    });


    const resetIncomeData = () => {
        setIncomeData(() => { return {
            income: 0,
            date: '0',
            description: "",
        }})
    }
    const submitIncome = (event) => {
        event.preventDefault();
        if (incomeData.income === 0 || incomeData.date === '0') {
            alert("Please fill all fields");
            return;
        }
        if (incomeData.income < 0) {
            alert("Income cannot be negative");
            setIncomeData(() => { return {
                ...incomeData,
                income: 0
            }})
            return;
        }
        if (confirm("Are you sure you want to add this income?") === false) return;
        saveIncome(incomeData);
        resetIncomeData();
    }

    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <section id="transaction" className={`bg-white min-w-full transition-all max-w-full ${isCollapsed ? 'h-24 overflow-clip opacity-80 shadow-ft-inner' : 'min-h-40 opacity-100 overflow-auto shadow-md'} rounded-md  border-t-4 border-ft-primary flex flex-col px-4 py-4 gap-4 items-center ${isCollapsed ? 'justify-start' : 'justify-center'} relative`}>
            <button type="button" className="!bg-ft-primary/90 text-ft-bg w-6 h-6 rounded-sm absolute top-5 right-3 cursor-pointer shadow-xs" onClick={() => setIsCollapsed(!isCollapsed)}><i className={`fa-solid ${isCollapsed ? 'fa-expand' : 'fa-compress'}`}></i></button>
            <h1 className="text-2xl font-bold mb-2 text-ft-primary top-0">Add Income</h1>
            <div className="w-full flex flex-col gap-2 *:w-full">
                <input 
                    disabled={isCollapsed}
                    type="number" 
                    placeholder="Income (IDR)" 
                    className="border border-ft-primary rounded-md p-2" 
                    onChange={(event) => {
                        setIncomeData(() => { return {
                            ...incomeData,
                            income: event.target.value
                        }})
                    }}
                    value={incomeData.income > 0 ? incomeData.income : ''}
                    min={0}
                />
                <input 
                    type="date" 
                    placeholder="Date" 
                    className="border border-ft-primary rounded-md p-2" 
                    onChange={(event) => {
                        setIncomeData(() => { return {
                            ...incomeData,
                            date: event.target.value
                        }})
                    }}
                    // defaultValue={new Date().toISOString().slice(0, 10)}
                    value={incomeData.date === '0' ? new Date().toISOString().slice(0, 10) : incomeData.date}
                />
                <textarea 
                    type="text" 
                    placeholder="Description" 
                    className="border border-ft-primary rounded-md p-2 max-h-32 min-h-15"
                    onChange={(event) => {
                        setIncomeData(() => { return {
                            ...incomeData,
                            description: event.target.value
                        }})
                    }}
                    value={incomeData.description}
                />

                <span className="min-w-full max-w-full min-h-2 flex items-center justify-around">
                    <button type="button" onClick={submitIncome} className="bg-ft-primary text-white rounded-md p-2 cursor-pointer hover:scale-101 hover:font-medium active:scale-99 w-40 [box-shadow:2px_2px_1px_black] active:shadow-none transition-all">Add Income</button>
                </span>
                {/* <button type="reset" onClick={resetIncomeData} className="bg-ft-accent/85 text-white rounded-md p-2 cursor-pointer hover:scale-101 hover:font-medium active:scale-99 w-40">Reset</button> */}
            </div>
        </section>
    )
}