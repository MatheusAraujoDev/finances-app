import { useState } from "react";
import Header from "src/components/Header";
import TableTransactions from "src/components/TableTransactions";

// interface ITransaction {
//   amount: number
//   description: string
//   category: string
//   date: string
//   userId: string
// }


// interface HomeProps {
//   transactions: ITransaction[];
// }

// export const getStaticProps: GetStaticProps<HomeProps> = async () => {
//   const response = await axios.get<ITransaction[]>('http://localhost:3001/transactions');
//   const transactions = response.data;

//   return {
//     props: {
//       transactions
//     }
//   }
// }

export default function index() {    // { transactions }: HomeProps
  const [showTable, setShowTable] = useState(true);
  // const [transactions, setTransactions] = useState<ITransaction[]>([])

  // useEffect(() => {
  //   fetch('http://localhost:3001/transactions')
  //   .then(response => response.json())
  //   .then((data: ITransaction[]) => {
  //     const transactionDescriptions = data.map(item => item)
  //     setTransactions(transactionDescriptions)
  //   })
  // }, [])

  return (
    <>
      <Header />
      <div className="flex justify-evenly py-5 text-xl">
        <button onClick={() => setShowTable(true)}><h1 className="hover:text-purple-900 hover:font-bold">Carteira</h1></button>
        <button onClick={() => setShowTable(false)} className="hover:text-purple-900 hover:font-bold">Dashboard</button>
      </div>

      {
        showTable ?
        <TableTransactions />
        : <p>DASHBOARD</p>
      }
      {/* <h1>Olá, <b>{userName}</b></h1> */}
      {/* <ul className="list-disc p-10">
        {
          transactions.length > 0 && transactions.map(item => <li key={item.description}>{item.description}</li>)
        }
      </ul> */}

      {/* <ul className="list-disc p-10">
        {
          transactions.length > 0 && transactions.map(item => <li key={item.description}>{item.description}</li>)
        }
      </ul> */}
    </>
  )
}
