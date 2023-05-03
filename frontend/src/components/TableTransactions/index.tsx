interface ITransaction {
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
  return (
    <div className="flex justify-center py-10">
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
              <tr className="text-center" key={item.description}>
                <td>R$ {item.amount}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{item.date}</td>
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
