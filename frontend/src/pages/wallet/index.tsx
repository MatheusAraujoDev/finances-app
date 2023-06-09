import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from 'src/components/Dashboard';
import Header from "src/components/Header";
import TableTransactions from "src/components/TableTransactions";
import { api } from "src/services/api";

interface ITransaction {
  id: string
  amount: number
  description: string
  category: string
  date: string
  userId: string
}

export default function index() {
  const [showTable, setShowTable] = useState(true);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const router = useRouter();
  const { t } = useTranslation();

  async function getTransactions() {
    const token = localStorage.getItem('finances-token');
    if(token) {
      const result = await api.get<ITransaction[]>("/transactions", { headers: { Authorization: 'Bearer ' + token } })
      setTransactions(result.data)

      api.defaults.headers.common.authorization = 'Bearer ' + token;
    } else {
      router.push("/")
    }
  }

  const isWalletSelected = showTable ? 'text-purple-900 font-bold text-2xl underline transform hover:translate-y-[-2px] active:translate-y-0' : 'text-black transform hover:translate-y-[-2px] active:translate-y-0';
  const isDashboardSelected = !showTable ? 'text-purple-900 font-bold text-2xl underline transform hover:translate-y-[-2px] active:translate-y-0' : 'text-black transform hover:translate-y-[-2px] active:translate-y-0';

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="flex justify-evenly pt-10 text-xl">
        <button onClick={() => setShowTable(true)}><h1 className={isWalletSelected}>{t("walletPage.walletTab")}</h1></button>
        <button onClick={() => setShowTable(false)} className={isDashboardSelected}>Dashboard</button>
      </div>

        {
          showTable ?
          <TableTransactions transactions={transactions} getTransactions={getTransactions} />
          : <Dashboard transactions={transactions} />
        }

        {(showTable === true && transactions.length === 0) && <h1 className='flex justify-center pt-7 text-purple-900 text-xl'>{t("tableExpenses.empty")}</h1>}
    </>
  )
}
