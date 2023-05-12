import { format } from "date-fns";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { FcPlus } from 'react-icons/fc';
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import { api } from "src/services/api";

interface ITransaction {
  id: string
  amount: number
  description: string
  category: string
  date: string
  userId: string
}

const modalStyles = {
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid black',
    borderRadius: '10px',
    margin: '0 auto',
    maxHeight: '35rem',
    maxWidth: '576px',
  }
};

interface IGetTransactionsProps {
  transactions: ITransaction[];
  getTransactions: () => void;
}

export default function index({ transactions, getTransactions }: IGetTransactionsProps ) {
  const router = useRouter();

  //modal fields
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  
  const [expenses, setExpenses] = useState(0);

  const openSelectedTransaction = (id: string) => {
    router.push(`/wallet/${id}`)
  }

  function handleCloseNewTransactionModal() {
    clearTransactionFields();
    setIsNewTransactionModalOpen(false);
  }

  const clearTransactionFields = () => {
    setAmount(0)
    setDescription("")
    setCategory("")
  }

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    try {      
      await api.post("/transactions", { description, amount, category, date: new Date() });
      getTransactions();
      toast.success('Transação adicionada com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar novo item!');
    }

    clearTransactionFields();
    handleCloseNewTransactionModal();
  }

  useEffect(() => {
    const total = transactions.length > 0 ? transactions.reduce((acc, item) => acc + item.amount, 0) : 0;
    setExpenses(total);
  }, [transactions]);

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <div className="w-4/5"><button type="button" onClick={() => setIsNewTransactionModalOpen(true)}><FcPlus size={35}/></button></div>
      <div className="w-4/5 text-3xl pb-2">Suas Despesas: R$ <span className="text-red-600">{expenses}</span></div>
      <table className="table-auto w-4/5 text-lg">
        <thead className="bg-gray-300">
          <tr>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Criada em</th>
          </tr>
        </thead>
        <tbody>
          {
            transactions.length > 0 ? transactions.map(item => 
              <tr key={item.description} onClick={() => openSelectedTransaction(item.id)} className="text-center hover:bg-purple-100 cursor-pointer">
                <td>R$ {item.amount}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{format(new Date(item.date), 'dd/MM/yyyy')}</td>
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

      <ReactModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
        ariaHideApp={false}
        style={modalStyles}
      >
        <div className="w-3/4">
          <div className="absolute right-6 top-6 border-0 bg-transparent"><button onClick={handleCloseNewTransactionModal}><BsXCircleFill color="#FF0000" size={28} /></button></div>
          
          <form onSubmit={handleAdd} className="flex flex-col justify-center items-center">
            <h1 className="text-2xl pb-6 text-center">CRIE UMA NOVA TRANSAÇÃO</h1>

            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                Valor
              </label>
              <input value={amount} placeholder="Valor" type="number" onChange={(e) => setAmount(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amount" />
            </div>

            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Descrição
              </label>
              <input value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" /* placeholder="Descrição" */ />
            </div>

            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Categoria
              </label>
              <input value={category} onChange={(e) => setCategory(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category" type="text" /* placeholder="Categoria" */ />
            </div>

            <button className="flex justify-center mt-5 w-full bg-[#33cc95] py-2 px-3 hover:brightness-90 transition duration-200 text-[#fff]" type="submit">Salvar</button>
          </form>
         </div>
      </ReactModal>
      
    </div>
  )
}
