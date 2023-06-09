import { format } from "date-fns";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsXCircleFill } from "react-icons/bs";
import { FcPlus } from 'react-icons/fc';
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import { api } from "src/services/api";
import currencyToNumber from "src/utils/currencyToNumber";
import numberToCurrency from "src/utils/numberToCurrency";
import onlyNumbers from "src/utils/onlyNumbers";

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
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")

  const [expenses, setExpenses] = useState(0);
  const { t } = useTranslation();

  const handleCurrency = (value: string) => {
    const string = onlyNumbers(value)
    setAmount(string);
  }

  const openSelectedTransaction = (id: string) => {
    router.push(`/wallet/${id}`)
  }

  function handleCloseNewTransactionModal() {
    clearTransactionFields();
    setIsNewTransactionModalOpen(false);
  }

  const clearTransactionFields = () => {
    setAmount("")
    setDescription("")
    setCategory("")
  }

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/transactions", { description, amount: currencyToNumber(amount), category, date: new Date() });
      getTransactions();
      toast.success(t("modalTransaction.new"));
    } catch (error) {
      toast.error(t("modalTransaction.createError"));
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
      <div className="w-4/5 text-3xl pb-2">{t("walletPage.yourExpenses")} <span className="text-red-600">{t("currency")} {expenses > 0 ? numberToCurrency(expenses) : "0"}</span></div>
      <table className="table-auto w-4/5 text-lg">
        <thead className="bg-gray-300">
          <tr>
            <th>{t("tableExpenses.value")}</th>
            <th>{t("tableExpenses.description")}</th>
            <th>{t("tableExpenses.category")}</th>
            <th>{t("tableExpenses.createdAt")}</th>
          </tr>
        </thead>
        <tbody>
          {
            transactions.length > 0 ? transactions.map(item => 
              <tr key={item.description} onClick={() => openSelectedTransaction(item.id)} className="text-center hover:bg-purple-100 cursor-pointer">
                <td>{t("currency")} {item.amount ? numberToCurrency(item.amount) : "0"}</td>
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
            <h1 className="text-2xl pb-6 text-center">{t("modalTransaction.add")}</h1>

            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                {t("modalTransaction.value")}
              </label>
              <input value={numberToCurrency(amount)} onChange={event => handleCurrency(event.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amount" />
            </div>

            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                {t("modalTransaction.description")}
              </label>
              <input value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" /* placeholder="Descrição" */ />
            </div>

            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                {t("modalTransaction.category")}
              </label>
              <input value={category} onChange={(e) => setCategory(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category" type="text" /* placeholder="Categoria" */ />
            </div>

            <button className="flex justify-center mt-5 w-full bg-[#33cc95] py-2 px-3 hover:brightness-90 transition duration-200 text-[#fff]" type="submit">{t("modalTransaction.save")}</button>
          </form>
         </div>
      </ReactModal>
      
    </div>
  )
}
