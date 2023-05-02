import Link from "next/link";
import { useRouter } from "next/router";

export default function Transaction() {
  const router = useRouter();

  // tem que ser o msm nome que ta no nome do arquivo. no caso [transactionId].tsx
  const transactionId = router.query.transactionId;
  
  return (
    <>
      <div>TRANSACTION PELO ID <b>{transactionId}</b></div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        <Link href="/">
          Voltar
        </Link>
      </button>
    </>
  )
}
