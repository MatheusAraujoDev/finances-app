import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
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
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const router = useRouter();

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

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-evenly py-5 text-xl">
        <button onClick={() => setShowTable(true)}><h1 className="hover:text-purple-900 hover:font-bold">Carteira</h1></button>
        <button onClick={() => setShowTable(false)} className="hover:text-purple-900 hover:font-bold">Dashboard</button>
      </div>

      {
        showTable ?
        <TableTransactions transactions={transactions} />
        : <p>DASHBOARD</p>
      }
    </>
  )
}
