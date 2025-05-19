import { useState } from 'react';

import Header from './components/Header'
import WelcomeBanner from './components/WelcomeBanner';
import Income from './components/Income';
import Summary from './components/Summary';

import './App.css'
import Expense from './components/Expense';
import History from './components/History';
import Footer from './components/Footer';

function App() {

    const formatRupiah = (value) => Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value).replace(/\u00A0/, ''); // Remove non-breaking space after "Rp"
    


    const loadIncome = () => JSON.parse(localStorage.getItem("incomes") || "[]");
    const loadExpense = () => JSON.parse(localStorage.getItem("expenses") || "[]");

    const [summary, setSummary] = useState(() => {
      let incomes = loadIncome(), expenses = loadExpense(), summary = {totalIncome: 0, totalExpense: 0};

      for (let i = 0; i < incomes.length; i++) {
        summary.totalIncome += parseInt(incomes[i].income);
      }
      for (let i = 0; i < expenses.length; i++) {
        summary.totalExpense += parseInt(expenses[i].expense);
      }
      localStorage.setItem("summary", JSON.stringify(summary));
      return summary;
    });
    const saveIncome = (income) => {
        let incomes = loadIncome();
        if (income === false) {
            setSummary((prev) => {
                const newSummary = {...prev, totalIncome: incomes.length === 0 ? 0 : incomes.reduce((acc, curr) => acc + parseInt(curr.income), 0)};
                localStorage.setItem("summary", JSON.stringify(newSummary));
                return newSummary;
            });
            return;
        }

        localStorage.setItem("incomes", JSON.stringify([...incomes, income]));
        setSummary((prev) => {
            const newSummary = {...prev, totalIncome: prev.totalIncome + parseInt(income.income)};
            localStorage.setItem("summary", JSON.stringify(newSummary));
            return newSummary;
        });
    }
    const saveExpense = (expense) => {
        let expenses = loadExpense();
        if (expense === false) {
            setSummary((prev) => {
                const newSummary = {...prev, totalExpense: expenses.length === 0 ? 0 : expenses.reduce((acc, curr) => acc + parseInt(curr.expense), 0)};
                localStorage.setItem("summary", JSON.stringify(newSummary));
                return newSummary;
            });
            return;
        }

        localStorage.setItem("expenses", JSON.stringify([...expenses, expense]));
        setSummary((prev) => {
            const newSummary = {...prev, totalExpense: prev.totalExpense + parseInt(expense.expense)};
            localStorage.setItem("summary", JSON.stringify(newSummary));
            return newSummary;
        });
    }
    

    return (
      <div className="min-w-full min-h-screen h-auto max-w-full flex flex-col bg-ft-bg relative">
        <Header />
        <main className="w-full min-h-screen h-fit bg-ft-bg relative flex flex-col px-4 xs:px-8 sm:px-25 md:px-34 lg:px-40 xl:px-50 2xl:px-60 py-5 gap-4">
          <WelcomeBanner />
          <Summary formatRupiah={formatRupiah} summary={summary} />

          <Income saveIncome={saveIncome} />
          <Expense saveExpense={saveExpense} />
          <History formatRupiah={formatRupiah} incomes={loadIncome()} expenses={loadExpense()} saveExpense={saveExpense} saveIncome={saveIncome} />
        </main>
        <Footer />
      </div>
    )
}

export default App
