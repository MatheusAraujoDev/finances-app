import { useEffect, useState } from "react"

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
  const [userName, setUserName] = useState<string | null>('')
  // const [transactions, setTransactions] = useState<ITransaction[]>([])

  // useEffect(() => {
  //   fetch('http://localhost:3001/transactions')
  //   .then(response => response.json())
  //   .then((data: ITransaction[]) => {
  //     const transactionDescriptions = data.map(item => item)
  //     setTransactions(transactionDescriptions)
  //   })
  // }, [])
  useEffect(() => {
    setUserName(localStorage.getItem("finances-userName"))
  }, [])




  return (
    <>
      <h1>DASHBOARD</h1>
      <h1>Olá, <b>{userName}</b></h1>
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
