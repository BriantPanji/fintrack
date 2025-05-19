import { useState, useRef, useEffect } from "react"

export default function Detail({isExpense, setIsDetailModalOpen, dataToShow}) {

    const [dataa, setData] = useState(dataToShow);
    const backRef = useRef(null);

    useEffect(() => {
        const eve = (e) => {
            if (e.target.ariaModal == 'true') {
                setIsDetailModalOpen(false);
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
    }, [setIsDetailModalOpen]);
    
    return (
        <div ref={backRef} aria-modal="true" role="dialog" className=" fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 ">
            <div className="bg-white w-11/12 sm:w-1/2 xl:w-1/3 2xl:w-1/3 min-h-100 rounded-lg shadow-lg p-4 relative">
                <button type="button" className="absolute top-5 right-5 text-ft-primary hover:text-ft-primary/80 transition duration-200 cursor-pointer"
                    onClick={() => setIsDetailModalOpen(false)} >  
                    <i className="fa-solid fa-xmark text-xl text-red-700"></i>
                </button>

                <h2 className="text-xl font-bold mb-4 h-10">Transaction Detail: <b className="font-medium">{isExpense ? "Expense" : "Income"}</b></h2>
                <div className="h-full flex flex-col justify-between w-full">
                    <div className="mb-4 w-full">
                        <label htmlFor="amount" className="block text-base font-medium text-gray-700">Amount</label>
                        <input readOnly type="number" id="amount" name="amount" value={isExpense ? dataa.expense : dataa.income} className="mt-1 px-2 h-10 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-ft-primary focus:border-ft-primary" />
                    </div>
                    {isExpense ? (
                    <div className="mb-4 w-full">
                        <label htmlFor="category" className="block text-base font-medium text-gray-700">Category</label>
                        <select disabled value={dataa.category} name="category" id="category" className="mt-1 px-2 h-10 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-ft-primary focus:border-ft-primary" >
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
                        <input readOnly type="date" id="date" name="date" value={dataa.date === '0' ? '' : dataa.date} className="mt-1 px-2 h-10 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-ft-primary focus:border-ft-primary" />
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="description" className="block text-base font-medium text-gray-700">Description</label>
                        <textarea readOnly defaultValue={dataa.description} id="description" name="description" className="mt-1 py-2 px-2 min-h-20 max-h-40 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-ft-primary focus:border-ft-primary">
                        </textarea>
                    </div>
                    <button type="button" onClick={() => setIsDetailModalOpen(false)} className="w-full bg-ft-primary text-white py-2 rounded-md hover:bg-ft-primary/90 transition duration-200">Done</button>
                </div>
                {/* <small className="text-xs px-2 text-amber-700 mt-2 italic">
                    Note: Kosongkan jika tidak ingin mengubah data
                </small> */}
            </div>
        </div>
    )
}