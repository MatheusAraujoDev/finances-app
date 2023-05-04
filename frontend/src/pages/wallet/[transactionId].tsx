import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "src/components/Header";
import { api } from "src/services/api";

interface ITransaction {
  id: string
  amount: number
  description: string
  category: string
  date: string
  userId: string
}

export default function Transaction() {
  const [transaction, setTransaction] = useState<ITransaction>()
  const router = useRouter();

  const transactionId = router.query.transactionId; // tem que ser o msm nome que ta no nome do arquivo. no caso [transactionId].tsx
  
  async function getTransactionById() {
    const token = localStorage.getItem('finances-token');
    api.get<ITransaction>(`/transactions/${transactionId}`, { headers: { Authorization: 'Bearer ' + token } })
    .then(res => {
      if(res.data) {
        setTransaction(res.data)
      } else {
        router.push("/wallet")
      }
    })
    .catch(() => router.push("/"))
  }

  useEffect(() => {
    getTransactionById();
  }, []);

  return (
    <>
      <Header />
      <div className="text-center py-12">TRANSACTION PELO ID <b>{transactionId}</b></div>
      
      <main className="flex flex-col items-center">
        <p>{transaction?.amount}</p>
        <p>{transaction?.description}</p>
        <p>{transaction?.category}</p>
        <p>{transaction?.date}</p>
      </main>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        <Link href="/wallet">
          Voltar
        </Link>
      </button>
    </>
  )
}
