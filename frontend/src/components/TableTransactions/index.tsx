import { format } from "date-fns";
import { useRouter } from "next/router";
// import { FcPlus } from 'react-icons/fc';

interface ITransaction {
  id: string
  amount: number
  description: string
  category: string
  date: string
  userId: string
}

interface IGetTransactionsProps {
  transactions: ITransaction[];
}

export default function index({ transactions }: IGetTransactionsProps ) {
  const router = useRouter();

  const openSelectedTransaction = (id: string) => {
    router.push(`/wallet/${id}`)
  }

  return (
    <div className="flex justify-center py-10">
      {/* <button><FcPlus size={30}/></button> */}
      <table className="table-auto w-4/5 text-lg">
        <thead className="bg-gray-300">
          <tr>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {
            transactions.length > 0 ? transactions.map(item => 
              <tr key={item.description} onClick={() => openSelectedTransaction(item.id)} className="text-center hover:bg-purple-100">
                <td>R$ {item.amount}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{format(new Date(item.date), 'dd/MM/yyyy')}</td>
                <td>botões</td>
              </tr>
            )
            :
            <tr className="text-center">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}
