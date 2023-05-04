import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPencil, BsTrash3Fill } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "src/components/Header";
import { api } from "src/services/api";
import Swal from "sweetalert2";

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

  async function editTransaction(id: string | undefined) {
    toast.success("Item Editado ;)")
  }

  async function deleteTransaction(id: string | undefined) {
    const swalResponse = await Swal.fire({
      title: 'Tem certeza que deseja excluir esse item de sua carteira?',
      text: 'Ele será deletado permanentemente',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
    })
    if(swalResponse.isConfirmed) {
      try {
        await api.delete("/transactions", { data: { ids: id } })
        await router.push("/wallet")
        Swal.fire(
          'Deletado!',
          'Item deletado com sucesso.',
          'success'
        )
      } catch (error) {
        toast.error('Erro ao deletar item!');
      }
    }
  }

  useEffect(() => {
    getTransactionById();
  }, []);

  return (
    <>
      <Header />
      <div className="text-4xl text-center py-6 pt-32">DETALHES DA TRANSAÇÃO</div>
      <ToastContainer />

      <main className="flex justify-center">
        <div className="flex flex-col justify-center items-center card shadow-2xl bg-white rounded-lg w-1/4 h-60">
          <p><b className="text-lg">Valor: </b> {transaction?.amount}</p>
          <p><b className="text-lg">Descrição: </b> {transaction?.description}</p>
          <p><b className="text-lg">Categoria: </b> {transaction?.category}</p>
          <p><b className="text-lg">Data: </b> {transaction?.date ? format(new Date(transaction?.date), 'dd/MM/yyyy') : '-'}</p>
          <p className="flex gap-10 pt-5">
            <button onClick={() => editTransaction(transaction?.id)}><BsPencil size={20} /></button>
            <button onClick={() => deleteTransaction(transaction?.id)}><BsTrash3Fill size={20} /></button>
          </p>
        </div>
      </main>

      <div className="flex justify-center pt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          <Link href="/wallet">
            Voltar
          </Link>
        </button>
      </div>
    </>
  )
}
