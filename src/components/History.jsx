import { useState, useEffect } from "react"
import EditModal from "./EditModal";
import Detail from "./Detail";

export default function History({incomes, expenses, saveExpense, saveIncome, formatRupiah}) {
    
    const [listHistory, setListHistory] = useState(() => {
        return [...expenses, ...incomes].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
    });

    const [search, setSearch] = useState("");

    // Update listHistory when incomes or expenses change
    useEffect(() => {
        setListHistory([...expenses, ...incomes].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        }));
    }, [incomes, expenses]);
    const [isCollapsed, setIsCollapsed] = useState(false);


    const handleTrash = (index) => {
        return (event) => {
            event.preventDefault();
            if (confirm("Are you sure you want to delete this transaction?") === false) return;
            setListHistory((prev) => {
                const newList = [...prev];
                newList.splice(index, 1);

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
        }
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDataExpense, setIsDataExpense] = useState(false);
    const [dataToEdit, setDataToEdit] = useState({});
    
    const handleEdit = (index) => {
        return (event) => {
            event.preventDefault();
            setDataToEdit(listHistory[index]);
            setIsDataExpense(listHistory[index].expense ? true : false);
            setIsEditModalOpen(true);
        }
    }
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const handleDetail = (index) => {
        return (event) => {
            event.preventDefault();
            setDataToEdit(listHistory[index]);
            setIsDataExpense(listHistory[index].expense ? true : false);
            setIsDetailModalOpen(true);
        }
    }

    useEffect(() => {
        const filteredHistory = [...expenses, ...incomes].filter((item) => {
            const date = new Date(item.date);
            const formattedDate = date.toLocaleDateString("id-ID", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
            });
            return (
                item.description.toLowerCase().includes(search.toLowerCase()) ||
                formattedDate.includes(search) ||
                (item.expense && item.category.toLowerCase().includes(search.toLowerCase())) ||
                (!item.expense && item.income.toString().includes(search))
            );
        }).sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });

        setListHistory(filteredHistory);
    }, [search, expenses, incomes]);

    return (
        <section id="history" className={`bg-white min-w-full transition-all max-w-full ${isCollapsed ? 'h-24 overflow-clip opacity-80 shadow-ft-inner' : 'min-h-40 opacity-100 overflow-auto shadow-md'} rounded-md  border-t-4 border-ft-primary flex flex-col px-4 py-4 gap-4 items-center ${isCollapsed ? 'justify-start' : 'justify-center'} relative`}>
            <button type="button" className="!bg-ft-primary/90 text-ft-bg w-6 h-6 rounded-sm absolute top-5 right-3 cursor-pointer shadow-xs" onClick={() => setIsCollapsed(!isCollapsed)}><i className={`fa-solid ${isCollapsed ? 'fa-expand' : 'fa-compress'}`}></i></button>
            <h1 className="text-2xl font-bold mb-2 text-ft-primary top-0">Transaction History</h1>
            <input type="search" autoComplete="fintrack" onChange={(ev) => setSearch(ev.target.value)} name="search" id="search" className="px-2 h-10 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-ft-primary focus:border-ft-primary" placeholder="Search..." />
            <div className="w-full flex flex-col gap-2 max-h-70 overflow-x-auto overflow-y-auto bg-ft-bg/70 rounded-md px-3 py-2 border">
                <table className="min-w-full divide-y-2 divide-gray-200 relative">
                    <thead className="ltr:text-left rtl:text-right sticky top-0 bg-ft-bg/70">
                        <tr className="*:font-medium *:text-gray-900">
                            <th className="px-3 py-2 whitespace-nowrap">Date</th>
                            <th className="px-3 py-2 whitespace-nowrap">Description</th>
                            <th className="px-3 py-2 whitespace-nowrap">Amount</th>
                            <th className="px-3 py-2 whitespace-nowrap">Category</th>
                            <th className="px-3 py-2 whitespace-nowrap w-22">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {(listHistory.length > 0) ? (
                            listHistory.map((item, index) => {
                                const date = new Date(item.date);
                                const formattedDate = date.toLocaleDateString("id-ID", {
                                    year: "2-digit",
                                    month: "2-digit",
                                    day: "2-digit",
                                });
                                return (
                                    <tr key={index} className={`${item.expense ? "*:text-red-800" : "*:text-emerald-800"}`}>
                                        <td className="px-3 py-2 whitespace-nowrap">{formattedDate}</td>
                                        <td className="px-3 py-2 whitespace-nowrap max-w-40 truncate">{item.description}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">{item.expense ? '-' + formatRupiah(item.expense) : '+' + formatRupiah(item.income)}</td>
                                        <td className="px-3 py-2 whitespace-nowrap font-medium">{item.expense ? item.category: '-'}</td>
                                        <td className="px-3 py-2 whitespace-nowrap flex w-22 gap-3">
                                            <button onClick={handleEdit(index)} className="cursor-pointer fa-solid fa-pencil text-yellow-700"></button>
                                            <button onClick={handleTrash(index)} className="cursor-pointer fa-solid fa-trash text-red-800"></button>
                                            <button onClick={handleDetail(index)} className="cursor-pointer fa-solid fa-ellipsis-vertical text-gray-900"></button>
                                        </td>
                                    </tr>
                                ) 
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-4">No transactions found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isEditModalOpen ? (
                <EditModal isExpense={isDataExpense} setIsEditModalOpen={setIsEditModalOpen} dataToEdit={dataToEdit} saveExpense={saveExpense} saveIncome={saveIncome} />
            ): (<></>)}
            {isDetailModalOpen ? (
                <Detail isExpense={isDataExpense} setIsDetailModalOpen={setIsDetailModalOpen} dataToShow={dataToEdit}  />
            ): (<></>)}
        </section>
    )
}