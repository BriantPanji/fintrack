
import { useState } from "react"


export default function Expense({ saveExpense }) {
    
    const [expenseData, setExpenseData] = useState({
        expense: 0,
        date: '0',
        description: "",
        category: ''
    });


    const resetExpenseData = () => {
        setExpenseData(() => { return {
            expense: 0,
            date: '0',
            description: "",
            category: ''
        }})
    }
    const submitExpense = (event) => {
        event.preventDefault();
        if (expenseData.expense === 0 || expenseData.date === '0') {
            alert("Please fill all fields");
            return;
        }
        if (expenseData.expense < 0) {
            alert("Expense cannot be negative");
            setExpenseData(() => { return {
                ...expenseData,
                expense: 0
            }})
            return;
        }
        if (confirm("Are you sure you want to add this expense?") === false) return;
        saveExpense(expenseData);
        resetExpenseData();
    }

    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <section className={`bg-white min-w-full transition-all max-w-full ${isCollapsed ? 'h-24 overflow-clip opacity-80 shadow-ft-inner' : 'min-h-40 opacity-100 overflow-auto shadow-md'} rounded-md  border-t-4 border-ft-primary flex flex-col px-4 py-4 gap-4 items-center ${isCollapsed ? 'justify-start' : 'justify-center'} relative`}>
            <button type="button" className="!bg-ft-primary/90 text-ft-bg w-6 h-6 rounded-sm absolute top-5 right-3 cursor-pointer shadow-xs" onClick={() => setIsCollapsed(!isCollapsed)}><i className={`fa-solid ${isCollapsed ? 'fa-expand' : 'fa-compress'}`}></i></button>
            <h1 className="text-2xl font-bold mb-2 text-ft-primary">Add Expense</h1>
            <div className="w-full flex flex-col gap-2 *:w-full">
                <input 
                    type="number" 
                    disabled={isCollapsed}
                    placeholder="Expense (IDR)" 
                    className="border border-ft-primary rounded-md p-2" 
                    onChange={(event) => {
                        setExpenseData(() => { return {
                            ...expenseData,
                            expense: event.target.value
                        }})
                    }}
                    value={expenseData.expense > 0 ? expenseData.expense : ''}
                    min={0}
                />
                <input 
                    type="date" 
                    placeholder="Date" 
                    className="border border-ft-primary rounded-md p-2" 
                    onChange={(event) => {
                        setExpenseData(() => { return {
                            ...expenseData,
                            date: event.target.value
                        }})
                    }}
                    // defaultValue={new Date().toISOString().slice(0, 10)}
                    value={expenseData.date === '0' ? new Date().toISOString().slice(0, 10) : expenseData.date}
                />
                <select name="category" id="category" className="border border-ft-primary rounded-md p-2" 
                    onChange={(event) => {
                        setExpenseData(() => { return {
                            ...expenseData,
                            category: event.target.value
                        }})
                    }}
                    value={expenseData.category === '' ? '0' : expenseData.category}
                >
                    <option value="0" disabled>Select Category</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="health">Health</option>
                    <option value="rent">Rent</option>
                    <option value="other">Other</option>
                </select>
                <textarea 
                    type="text" 
                    placeholder="Description" 
                    className="border border-ft-primary rounded-md p-2 max-h-32 min-h-15"
                    onChange={(event) => {
                        setExpenseData(() => { return {
                            ...expenseData,
                            description: event.target.value
                        }})
                    }}
                    value={expenseData.description}
                />

                <span className="min-w-full max-w-full min-h-2 flex items-center justify-around">
                    <button type="button" onClick={submitExpense} className="bg-ft-primary text-white rounded-md p-2 cursor-pointer hover:scale-101 hover:font-medium active:scale-99 w-40 [box-shadow:2px_2px_1px_black] active:shadow-none transition-all">Add Expense</button>
                </span>
                {/* <button type="reset" onClick={resetExpenseData} className="bg-ft-accent/85 text-white rounded-md p-2 cursor-pointer hover:scale-101 hover:font-medium active:scale-99 w-40">Reset</button> */}
            </div>
        </section>
    )
}