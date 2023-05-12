import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { BsPencil, BsTrash3Fill, BsXCircleFill } from "react-icons/bs";
import ReactModal from "react-modal";
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

export default function Transaction() {
  const [transaction, setTransaction] = useState<ITransaction>()
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const router = useRouter();
  const transactionId: any = router.query.transactionId;

  //modal fields
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")

  async function getTransactionById() {
    const token = localStorage.getItem('finances-token');
    await api.get<ITransaction>(`/transactions/${transactionId}`, { headers: { Authorization: 'Bearer ' + token } })
    .then(res => {
      if(res.data) {
        setTransaction(res.data)
        setAmount(res.data.amount)
        setDescription(res.data.description)
        setCategory(res.data.category)
      } else {
        router.push("/wallet")
      }
    })
    .catch(() => router.push("/"))
  }

  const closeEditTransactionModal = () => {
    clearTransactionFields();
    setEditModalIsOpen(false);
  }

  const clearTransactionFields = () => {
    if(transaction !== undefined){
      setAmount(transaction.amount)
      setDescription(transaction.description)
      setCategory(transaction.category)
    }
  }

  async function handleEdit(e: FormEvent) {
    e.preventDefault();

    try {
      await api.put(`/transactions/${transaction?.id}`, {amount, description, category})
      await router.push("/wallet")
      Swal.fire(
        'Editado!',
        'Transação editada com sucesso!',
        'success'
      )
    } catch (error) {
      toast.error('Erro ao editar item!');
    }
    clearTransactionFields();
    closeEditTransactionModal();
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
          <p><b className="text-lg">Valor: </b>R$ {amount}</p>
          <p><b className="text-lg">Descrição: </b> {description}</p>
          <p><b className="text-lg">Categoria: </b> {category}</p>
          <p className="flex gap-10 pt-5">
            <button onClick={() => setEditModalIsOpen(true)}><BsPencil size={20} /></button>
            <button onClick={() => deleteTransaction(transaction?.id)}><BsTrash3Fill size={20} /></button>
          </p>
        </div>
      </main>

      <ReactModal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditTransactionModal}
        ariaHideApp={false}
        style={modalStyles}
      >
        <div className="w-3/4">
        <div className="absolute right-6 top-6 border-0 bg-transparent"><button onClick={closeEditTransactionModal}><BsXCircleFill color="#FF0000" size={25} /></button></div>
        
          <form onSubmit={handleEdit} className="flex flex-col justify-center items-center">
            <h1 className="text-2xl pb-6 text-center">EDITE SUA TRANSAÇÃO</h1>

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

      <div className="flex justify-center pt-4">
        <button onClick={() => router.push("/wallet")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Voltar
        </button>
      </div>
    </>
  )
}
