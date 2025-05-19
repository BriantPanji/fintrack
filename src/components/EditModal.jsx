import { useState, useEffect, useRef } from "react"

export default function EditModal({isExpense, setIsEditModalOpen, dataToEdit, saveExpense, saveIncome, setListHistory}) {

    const [dataa, setData] = useState(dataToEdit);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleEdit = (event) => {
        event.preventDefault();
        if (dataa.expense === 0 || dataa.date === '0') {
            alert("Please fill all fields");
            return;
        }
        if (dataa.expense < 0) {
            alert("Expense cannot be negative");
            setData((prev) => ({
                ...prev,
                expense: 0
            }));
            return;
        }
        if (confirm("Are you sure you want to edit this transaction?") === false) return;

        setListHistory((prev) => {
            const newList = [...prev];
            const index = newList.findIndex(item => item.date === dataToEdit.date && item.description === dataToEdit.description);
            if (index !== -1) {
                newList[index] = dataa;
            }
            // Pisahkan income dan expense
            const incomeList = newList.filter(item => item.income);
            const expenseList = newList.filter(item => item.expense);
            // Update localStorage langsung
            localStorage.setItem("incomes", JSON.stringify(incomeList));
            localStorage.setItem("expenses", JSON.stringify(expenseList));
            // Reset summary agar App akan hitung ulang
            saveIncome(false);
            saveExpense(false);
            return newList;
        });

        saveExpense(false);
        saveIncome(false);
        setIsEditModalOpen(false);
    }

    const backRef = useRef(null);

    useEffect(() => {
        const eve = (e) => {
            if (e.target.ariaModal == 'true') {
                setIsEditModalOpen(false);
            }
        }
        const modalNode = backRef.current;
        if (modalNode) {
            modalNode.addEventListener('click', eve);
        }

        return () => {
            if (modalNode) {
                modalNode.removeEventListener('click', eve);
            }
        }
    }, [setIsEditModalOpen]);

    return (
        <div ref={backRef} aria-modal="true" role="dialog" className=" fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 ">
            <div className="bg-white w-11/12 sm:w-1/2 xl:w-1/3 2xl:w-1/3 min-h-100 rounded-lg shadow-lg p-4 relative">
                <button type="button" className="absolute top-5 right-5 text-ft-primary hover:text-ft-primary/80 transition duration-200 cursor-pointer"
                    onClick={() => setIsEditModalOpen(false)} >  
                    <i className="fa-solid fa-xmark text-xl text-red-700"></i>
                </button>

                <h2 className="text-xl font-bold mb-4 h-10">Edit Transaction: <b className="font-medium">{isExpense ? "Expense" : "Income"}</b></h2>
                <div className="h-full flex flex-col justify-between w-full">
                    <div className="mb-4 w-full">
                        <label htmlFor="amount" className="block text-base font-medium text-gray-700">Amount</label>
                        <input type="number" id="amount" name="amount" onChange={(ev) => {setData((pre) => {return {...pre, [`${isExpense ? 'expense': 'income'}`]: ev.target.value}})}} value={isExpense ? dataa.expense : dataa.income} className="mt-1 px-2 h-10 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-ft-primary focus:border-ft-primary" />
                    </div>
                    {isExpense ? (
                    <div className="mb-4 w-full">
                        <label htmlFor="category" className="block text-base font-medium text-gray-700">Category</label>
                        <select onChange={handleChange} value={dataa.category} name="category" id="category" className="mt-1 px-2 h-10 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-ft-primary focus:border-ft-primary" >
                            <option value="0" disabled>Select Category</option>
                            <option value="food">Food</option>
                            <option value="transport">Transport</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="health">Health</option>
                            <option value="rent">Rent</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    ) : (
                        <></>
                    )}
                    <div className="mb-4 w-full">
                        <label htmlFor="date" className="block text-base font-medium text-gray-700">Date</label>
                        <input type="date" id="date" name="date" onChange={handleChange} value={dataa.date === '0' ? '' : dataa.date} className="mt-1 px-2 h-10 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-ft-primary focus:border-ft-primary" />
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="description" className="block text-base font-medium text-gray-700">Description</label>
                        <textarea id="description" value={dataa.description} name="description" onChange={handleChange} className="mt-1 py-2 px-2 min-h-20 max-h-40 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-ft-primary focus:border-ft-primary">
                            
                        </textarea>
                    </div>
                    <button type="button" onClick={handleEdit} className="w-full bg-ft-primary text-white py-2 rounded-md hover:bg-ft-primary/90 transition duration-200">Save Changes</button>
                </div>
                {/* <small className="text-xs px-2 text-amber-700 mt-2 italic">
                    Note: Kosongkan jika tidak ingin mengubah data
                </small> */}
            </div>
        </div>
    )
}